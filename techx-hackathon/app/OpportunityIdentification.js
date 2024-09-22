import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'expo-router';  // Import useRouter for navigation
import { ActivityIndicator, View } from 'react-native';  // Import ActivityIndicator for loader
import ClientList from '../components/ClientList';
import ClientDetails from '../components/ClientDetails';
import Opportunities from '../components/Opportunities';
import StyledButton from '../components/StyledButton';

// Example clients data
import clientsData from './data';

// Available opportunities
const availableOpportunities = [
  {
    id: 'upsell_001',
    category: 'Insurance Coverage Upsell',
    content: 'Save 10% on your car insurance when you bundle it with your homeowner’s policy. Act now!',
    imageUrl: 'off1'
  },
  {
    id: 'upsell_002',
    category: 'Insurance Coverage Upsell',
    content: 'Get a 15% discount on life insurance when you add it to your existing car insurance plan.',
    imageUrl: 'off2'
  },
  {
    id: 'upsell_003',
    category: 'Insurance Coverage Upsell',
    content: 'Bundle home and auto insurance and receive $50 off your first umbrella liability insurance premium!',
    imageUrl: 'off3'
  },
  {
    id: 'upsell_004',
    category: 'Insurance Coverage Upsell',
    content: '5% off pet insurance when you already have homeowner’s or renter’s insurance with us!',
    imageUrl: 'off4'
  },
  {
    id: 'upsell_005',
    category: 'Insurance Coverage Upsell',
    content: 'Protect your home with flood insurance—get 20% off for the first year when added to your homeowner’s policy!',
    imageUrl: 'off5'
  },
  {
    id: 'addon_001',
    category: 'Insurance Add-ons',
    content: '5% off valuable item insurance (for jewelry, electronics, and more) when you add it to your homeowner’s policy today.',
    imageUrl: 'off6'
  },
  {
    id: 'addon_002',
    category: 'Insurance Add-ons',
    content: 'Add personal liability coverage to your homeowner’s or renter’s insurance and get a $25 gift card!',
    imageUrl: 'off7'
  },
  {
    id: 'addon_003',
    category: 'Insurance Add-ons',
    content: 'Free 6-month roadside assistance add-on when you purchase a new auto insurance policy!',
    imageUrl: 'off8'
  },
  {
    id: 'addon_004',
    category: 'Insurance Add-ons',
    content: 'Run a business from home? Get 10% off home business coverage when you add it to your homeowner’s policy.',
    imageUrl: 'off9'
  },
  {
    id: 'addon_005',
    category: 'Insurance Add-ons',
    content: 'Get 6 months of free identity theft protection when you add it to your home or auto insurance policy.',
    imageUrl: 'off10'
  },
  {
    id: 'partner_001',
    category: 'Partner Offers',
    content: '5% off your next oil change or tire rotation at AutoCare when you have an active auto insurance policy!',
    imageUrl: 'off11'
  },
  {
    id: 'partner_002',
    category: 'Partner Offers',
    content: '10% off your home security system installation with SecureHome when you have a homeowner’s insurance policy!',
    imageUrl: 'off12'
  },
  {
    id: 'partner_003',
    category: 'Partner Offers',
    content: '$100 off moving services with MoveItCo when you sign up for a new homeowner’s insurance policy.',
    imageUrl: 'off13'
  },
  {
    id: 'partner_004',
    category: 'Partner Offers',
    content: 'Free car detailing (up to $50 value) at CleanRide when you renew or purchase your auto insurance policy today!',
    imageUrl: 'off14'
  },
  {
    id: 'partner_005',
    category: 'Partner Offers',
    content: '10% off pet grooming services at PetFriends salon if you add pet insurance to your existing policy!',
    imageUrl: 'off15'
  }
];


const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '70px',
  paddingLeft: '40px',
  paddingRight: '40px',
  height: 'calc(100vh - 70px)',
  background: 'linear-gradient(180deg, #3399FF, #1A1D2F)',
});

const LeftColumn = styled(Box)({
  flex: '0 0 30%',
  backgroundColor: '#f0f4f8',
  padding: '20px',
  overflowY: 'auto',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const RightColumn = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const UpperRow = styled(Box)({
  height: '250px',
  padding: '20px',
  backgroundColor: '#e8eef3',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  position: 'relative',
  overflowY: 'auto',
});

const LowerRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 50%',
  backgroundColor: '#e8eef3',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflowY: 'auto',
});

const OpportunitiesContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const ButtonContainer = styled(Box)({
  padding: '20px',
  textAlign: 'center',
});

// The generateText function (from your Node.js code)
const generateText = async (selectedData) => {
  const url = "http://localhost:3100/generate-text";
  
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(selectedData),
  });

  if (!response.ok) {
    throw new Error("Failed to generate text");
  }

  const result = await response.json();
  return result;
};

const findOpportunities = async (selectedData) => {
  const url = "http://localhost:3100/find-opportunities";
  
  const response = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(selectedData),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch opportunities");
  }

  const result = await response.json();
  return result;
};

function OpportunityIdentification() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [opportunityCards, setOpportunityCards] = useState([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);  // Track loading state

  const router = useRouter();  // Navigation hook from expo-router

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setOpportunityCards([]);  // Reset opportunities when a new client is selected
    setSelectedOpportunities([]);  // Clear selected opportunities
  };

  const handleIdentifyOpportunities = async () => {
    if (!selectedClient) return;
  
    try {
      const clientData = {
        client: `
        ${selectedClient.name} is a ${selectedClient.occupation}. ${
        selectedClient.gender === "Female" ? "She" : "He"
      } was born on ${new Date(selectedClient.dateOfBirth).toLocaleDateString()} and is currently ${
        new Date().getFullYear() - new Date(selectedClient.dateOfBirth).getFullYear()
      } years old. ${selectedClient.gender === "Female" ? "She" : "He"} lives at ${
        selectedClient.homeAddress
      } and is ${selectedClient.maritalStatus}.
      
        ${
          selectedClient.gender === "Female" ? "She" : "He"
        } works as a ${selectedClient.employmentStatus} and earns an income of ${
        selectedClient.incomeLevel
      } annually. ${
        selectedClient.dependents > 0
          ? `They have ${selectedClient.dependents} dependents.`
          : `${selectedClient.gender === "Female" ? "She" : "He"} does not have any dependents.`
      } ${selectedClient.gender === "Female" ? "Her" : "His"} credit history is ${
        selectedClient.creditHistory
      } and health is considered ${selectedClient.healthHistory}. ${
        selectedClient.lifestyleInfo.charAt(0).toUpperCase() +
        selectedClient.lifestyleInfo.slice(1)
      } lifestyle.
      
        ${selectedClient.name}'s insurance policy is a ${selectedClient.policyType} with policy number ${
        selectedClient.policyNumber
      }, which started on ${new Date(
        selectedClient.policyStartDate
      ).toLocaleDateString()} and expires on ${new Date(
        selectedClient.policyExpirationDate
      ).toLocaleDateString()}. ${selectedClient.gender === "Female" ? "She" : "He"} pays a premium of ${
        selectedClient.policyPremium
      }, with payments made ${selectedClient.premiumPaymentFrequency}.
      
        The coverage limits are ${selectedClient.coverageLimits}, with a deductible of ${
        selectedClient.deductible
      }, and the policy includes ${selectedClient.endorsementsRiders}. Some exclusions are ${
        selectedClient.exclusions
      }.
      
        The insured asset is a ${selectedClient.insuredAssetInfo}, and there has been ${
        selectedClient.claimsHistory
      }. The policy is currently ${selectedClient.policyStatus}, and ${
        selectedClient.gender === "Female" ? "she" : "he"
      } qualifies for ${selectedClient.discountsApplied}. The policy is handled by ${
        selectedClient.insuranceAgent
      } and reinsured by ${selectedClient.reinsuranceDetails}. Preferences include ${
        selectedClient.policyholderPreferences
      }.
      `
      };
  
      console.log("Setting loader to true...");  // Debugging line
      setLoading(true);  // Ensure loader is set before the async operation starts
  
      const bestOpportunities = await findOpportunities(clientData);

      console.log(clientData)
  
      // Debug: Log the generated_text and opportunityIds for inspection
      console.log("Generated text:", bestOpportunities.results[0].generated_text);
  
      // Parse the generated_text as an array of opportunity IDs
      const opportunityIds = JSON.parse(bestOpportunities.results[0].generated_text);
      console.log("Opportunity IDs:", opportunityIds);
  
      // Ensure availableOpportunities is referenced correctly
      const matchingOpportunities = availableOpportunities.filter(opportunity => {
        return opportunityIds.includes(opportunity.id);
      });
  
      console.log("Matching opportunities:", matchingOpportunities);
  
      setOpportunityCards(matchingOpportunities);  // Update the state with the matching offers
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      console.log("Setting loader to false...");  // Debugging line
      setLoading(false);  // Ensure loader is hidden after the process is completed
    }
  };
  

  const handleSubmitSelectedOpportunities = async () => {
    setLoading(true);  // Show loader when submission starts

    const selectedData = {
      client: `${selectedClient.name} is a ${selectedClient.occupation}. ${
      selectedClient.gender === "Female" ? "She" : "He"
    } was born on ${new Date(selectedClient.dateOfBirth).toLocaleDateString()} and is currently ${
      new Date().getFullYear() - new Date(selectedClient.dateOfBirth).getFullYear()
    } years old. ${selectedClient.gender === "Female" ? "She" : "He"} lives at ${
      selectedClient.homeAddress
    } and is ${selectedClient.maritalStatus}.
    
      ${
        selectedClient.gender === "Female" ? "She" : "He"
      } works as a ${selectedClient.employmentStatus} and earns an income of ${
      selectedClient.incomeLevel
    } annually. ${
      selectedClient.dependents > 0
        ? `They have ${selectedClient.dependents} dependents.`
        : `${selectedClient.gender === "Female" ? "She" : "He"} does not have any dependents.`
    } ${selectedClient.gender === "Female" ? "Her" : "His"} credit history is ${
      selectedClient.creditHistory
    } and health is considered ${selectedClient.healthHistory}. ${
      selectedClient.lifestyleInfo.charAt(0).toUpperCase() +
      selectedClient.lifestyleInfo.slice(1)
    } lifestyle.
    
      ${selectedClient.name}'s insurance policy is a ${selectedClient.policyType} with policy number ${
      selectedClient.policyNumber
    }, which started on ${new Date(
      selectedClient.policyStartDate
    ).toLocaleDateString()} and expires on ${new Date(
      selectedClient.policyExpirationDate
    ).toLocaleDateString()}. ${selectedClient.gender === "Female" ? "She" : "He"} pays a premium of ${
      selectedClient.policyPremium
    }, with payments made ${selectedClient.premiumPaymentFrequency}.
    
      The coverage limits are ${selectedClient.coverageLimits}, with a deductible of ${
      selectedClient.deductible
    }, and the policy includes ${selectedClient.endorsementsRiders}. Some exclusions are ${
      selectedClient.exclusions
    }.
    
      The insured asset is a ${selectedClient.insuredAssetInfo}, and there has been ${
      selectedClient.claimsHistory
    }. The policy is currently ${selectedClient.policyStatus}, and ${
      selectedClient.gender === "Female" ? "she" : "he"
    } qualifies for ${selectedClient.discountsApplied}. The policy is handled by ${
      selectedClient.insuranceAgent
    } and reinsured by ${selectedClient.reinsuranceDetails}. Preferences include ${
      selectedClient.policyholderPreferences
    }.`,
      selectedOpportunities: selectedOpportunities.map(index => opportunityCards[index]),
    };

    try {
      const response = await generateText(selectedData);
      router.push({
        pathname: '/result',
        params: { result: JSON.stringify(response) },  // Pass the generated response as a string
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);  // Hide loader when submission is done
    }
  };

  return (
    <PageContainer>
      <LeftColumn>
        <ClientList clientsData={clientsData} handleClientClick={handleClientClick} />
      </LeftColumn>

      <RightColumn>
        <UpperRow>
          <ClientDetails selectedClient={selectedClient} />
          {selectedClient && (
            loading ? (
              <ActivityIndicator size="large" color="#1e90ff" />
            ) : (
              <StyledButton text={"Identify Opportunities"} onClick={handleIdentifyOpportunities}>
              
            </StyledButton>
            )
            
            
          )}
        </UpperRow>
        <LowerRow>
          <OpportunitiesContainer>
            <Opportunities
              opportunityCards={opportunityCards}
              selectedOpportunities={selectedOpportunities}
              setSelectedOpportunities={setSelectedOpportunities}
            />
            {opportunityCards.length > 0 && (
              <ButtonContainer>
                {loading ? (
                  <ActivityIndicator size="large" color="#1e90ff" />
                ) : (
                  <StyledButton text={"Proceed"} onClick={handleSubmitSelectedOpportunities}>
                    
                  </StyledButton>
                )}
              </ButtonContainer>
            )}
          </OpportunitiesContainer>
        </LowerRow>
      </RightColumn>
    </PageContainer>
  );
}

export default OpportunityIdentification;
