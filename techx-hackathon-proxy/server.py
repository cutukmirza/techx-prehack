from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains, or specify allowed domains as needed

IBM_API_KEY = "GLGQVXazES5t1Rfo8l6W_veUoyHqbSK8tN3fRzfc7bCe" 

# Proxy route to forward requests to the IBM API
@app.route('/generate-text', methods=['POST'])
def generate_text():
    try:
        id_url = "https://iam.cloud.ibm.com/identity/token"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = {
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": f"{IBM_API_KEY}"  # Replace with your actual API key
        }

        response = requests.post(id_url, headers=headers, data=data)
        
        auth_key = response.json()['access_token']
        

        client_data = request.json.get("client", {})
        print(client_data)
        selected_opportunities = request.json.get("selectedOpportunities", [])

        # print("Received client data:", client_data)
        print("Received selected opportunities:", selected_opportunities)


        # If no client data or opportunities are received, return an error
        if not client_data or not selected_opportunities:
            return jsonify({"error": "Client data and selected opportunities are required"}), 400


        url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"

        body = {
            "input": f"""You are an experienced and knowledgeable insurance professional with a deep understanding of the insurance industry, client needs, and coverage options. You are tasked with drafting a personalized, compelling email to a valued client. Take into account the clients'\'' age and other personal information so that you can establish rapport. Additionally, there will be a pdf attached will all the possible offers, so you should also refer to that when writing the email.

        Below is the client'\''s data and selected opportunities for coverage improvement. Based on this information, compose an engaging email that:

            Demonstrates a deep understanding of the client'\''s unique situation and insurance needs.
            Highlights the benefits of the suggested insurance products or policy adjustments.
            Emphasizes the value of adequate coverage in mitigating risks.
            Is written in a friendly, professional tone.
            Encourages the client to take action by booking a meeting or responding to the email.

        Compose the email with these considerations in mind and craft a call to action encouraging John to review his coverage and schedule a meeting to discuss options.

        {client_data}
        Selected Opportunities:
        {selected_opportunities}
        Output:""",
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 1200,
                "repetition_penalty": 1
            },
            "model_id": "ibm/granite-13b-instruct-v2",
            "project_id": "58de1da8-06e2-4ac9-a350-dd4032cccf4c",
            "moderations": {
                "hap": {
                    "input": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    },
                    "output": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    }
                }
            }
        }

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {auth_key}"
        }

        response = requests.post(
            url,
            headers=headers,
            json=body
        )

        if response.status_code != 200:
            raise Exception("Non-200 response: " + str(response.text))
        
        # Return the IBM API response back to the frontend
        print(response.json())
        return jsonify(response.json())

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/find-opportunities', methods=['POST'])
def find_opportunities():
    try:
        id_url = "https://iam.cloud.ibm.com/identity/token"
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        data = {
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": f"{IBM_API_KEY}"  # Replace with your actual API key
        }

        response = requests.post(id_url, headers=headers, data=data)
        
        auth_key = response.json()['access_token']
        

        client_data = request.json.get("client", {})

        

        print("Received client data:", client_data)



        # If no client data or opportunities are received, return an error
        if not client_data:
            return jsonify({"error": "Client data is required"}), 400


        url = "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"

        body = {
	"input": f"""You are an experienced and knowledgeable insurance professional with a deep understanding of the insurance industry, client needs, and coverage options. You are tasked with selecting best personalized offers for a client. Take into account the clients'\'' age and other personal information so that you can establish rapport.


available opportunities for coverage improvement: 
Insurance Coverage Upsell:

ID: upsell_001
Offer: Save 10% on your car insurance when you bundle it with your homeowner’s policy. Act now!

ID: upsell_002
Offer: Get a 15% discount on life insurance when you add it to your existing health insurance plan.

ID: upsell_003
Offer: Bundle home and auto insurance and receive $50 off your first umbrella liability insurance premium!

ID: upsell_004
Offer: 5% off pet insurance when you already have homeowner’s or renter’s insurance with us!

ID: upsell_005
Offer: Protect your home with flood insurance—get 20% off for the first year when added to your homeowner’s policy!

Insurance Add-ons:

ID: addon_001
Offer: 5% off valuable item insurance (for jewelry, electronics, and more) when you add it to your homeowner’s policy today.

ID: addon_002
Offer: Add personal liability coverage to your homeowner’s or renter’s insurance and get a $25 gift card!

ID: addon_003
Offer: Free 6-month roadside assistance add-on when you purchase a new auto insurance policy!

ID: addon_004
Offer: Run a business from home? Get 10% off home business coverage when you add it to your homeowner’s policy.

ID: addon_005
Offer: Get 6 months of free identity theft protection when you add it to your home or auto insurance policy!

Partner Offers:

ID: partner_001
Offer: 5% off your next oil change or tire rotation at AutoCare when you have an active auto insurance policy!

ID: partner_002
Offer: 10% off your home security system installation with SecureHome when you have a homeowner’s insurance policy!

ID: partner_003
Offer: $100 off moving services with MoveItCo when you sign up for a new homeowner’s insurance policy.

ID: partner_004
Offer: Free car detailing (up to $50 value) at CleanRide when you renew or purchase your auto insurance policy today!

ID: partner_005
Offer: 10% off pet grooming services at PetFriends salon if you add pet insurance to your existing policy!


        only provide a choice from the available offers, do not make new ones. The output should be an array with offer ids, for example something like this [\"partner_005\", \"addon_005\"].  Do not select all offers for each client, only the ones that apply to them!

Examples are provided below:

Input: Michael Johnson is a Software Engineer. He was born on 15/03/1985 and is currently 39 years old. He lives at 1234 Elm St, Springfield, IL and is Married with 2 children.

He works as a Full-time employee and earns an income of $120,000 annually. He does not smoke and his health is considered Good.

Michael Johnson'\''s insurance policy is a Homeowner’s Insurance with policy number P1234567890, which started on 15/03/2020 and expires on 15/03/2025. He pays a premium of $1,200/year, with payments made Monthly.

The coverage limits are $300,000, with a deductible of $1,000. The policy includes coverage for theft, fire, and natural disasters. Some exclusions are Flood damage.

The policy is currently Active, and he qualifies for a good credit discount. The policy is handled by Lisa Thompson and reinsured by Statewide Re. Preferences include Monthly payments and paperless billing.
Output: [\"upsell_005\", \"addon_001\", \"partner_002\"]

Input: Sarah Lee is a Marketing Consultant. She was born on 05/09/1992 and is currently 32 years old. She lives at 3456 Pine Ave, Seattle, WA and is Single.

She works as a Freelancer and earns an income of $70,000 annually. She has no dependents and her health is considered Fair. She is a Non-smoker.

Sarah Lee’s insurance policy is a Renter’s Insurance with policy number P9871236540, which started on 01/01/2021 and expires on 01/01/2024. She pays a premium of $400/year, with payments made Quarterly.

The coverage limits are $50,000, with a deductible of $250. The policy includes coverage for theft and personal liability.

The policy is currently Active, and she qualifies for a good renter’s discount. The policy is handled by James Carter and reinsured by National Re. Preferences include Quarterly payments and paperless billing.
Output: [\"addon_005\", \"partner_002\", \"addon_002\"]


Input: Robert Anderson is a Financial Analyst. He was born on 22/11/1970 and is currently 53 years old. He lives at 7890 Maple Dr, Austin, TX and is Divorced with 1 dependent.

He works as a Full-time employee and earns an income of $150,000 annually. He is a Smoker and his health is considered Fair.

Robert Anderson’s insurance policy is a Life Insurance with policy number P6543210987, which started on 15/06/2018 and expires on 15/06/2028. He pays a premium of $1,800/year, with payments made Annually.

The coverage limits are $500,000, with a deductible of $2,000.

The policy is currently Active, and he qualifies for a standard rate. The policy is handled by Grace Miller and reinsured by Lone Star Re. Preferences include Annual payments and physical mail.
Output: [\"upsell_002\", \"addon_005\"]


Input: Emily Davis is a Veterinarian. She was born on 12/07/1988 and is currently 36 years old. She lives at 123 Birch Ln, Denver, CO and is Engaged.

She works as a Full-time employee and earns an income of $100,000 annually. She has no dependents and her health is considered Excellent. She is a Non-smoker.

Emily Davis’ insurance policy is a Homeowner’s Insurance with policy number P6549873210, which started on 01/10/2021 and expires on 01/10/2024. She pays a premium of $1,500/year, with payments made Monthly.

The coverage limits are $400,000, with a deductible of $1,000. The policy includes coverage for theft, fire, and personal liability.

The policy is currently Active, and she qualifies for a safe home discount. The policy is handled by Ryan Green and reinsured by Mountain Re. Preferences include Monthly payments and paperless billing.
Output: [\"addon_004\", \"upsell_004\", \"partner_005\"]

Input: Jane Smith is a Graphic Designer. She was born on 21/07/1990 and is currently 34 years old. She lives at 5678 Oak St, Metropolis, NY and is Single.\n      \n        She works as a Freelancer and earns an income of $80,000 annually. She does not have any dependents. Her credit history is Good and health is considered Fair. Occasional smoker lifestyle.\n      \n        Jane Smith'\''s insurance policy is a Car Insurance with policy number P9876543210, which started on 01/05/2020 and expires on 30/04/2023. She pays a premium of $600/year, with payments made Monthly.\n      \n        The coverage limits are $100,000, with a deductible of $500, and the policy includes Roadside assistance. Some exclusions are Racing incidents.\n      \n        The insured asset is a 2018 Toyota Corolla, and there has been 1 minor claim. The policy is currently Active, and she qualifies for Safe driver discount. The policy is handled by Mark Johnson and reinsured by Reinsured by National Re. Preferences include Monthly payments, paperless billing.\n  

The offers perfect for this client are:
{client_data}

        
        Output:""",
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 200,
                "repetition_penalty": 1
            },
            "model_id": "ibm/granite-13b-instruct-v2",
            "project_id": "58de1da8-06e2-4ac9-a350-dd4032cccf4c",
            "moderations": {
                "hap": {
                    "input": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    },
                    "output": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    }
                }
            }
        }

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {auth_key}"
        }

        response = requests.post(
            url,
            headers=headers,
            json=body
        )

        if response.status_code != 200:
            raise Exception("Non-200 response: " + str(response.text))
        
        # Return the IBM API response back to the frontend
        print(response.json())
        return jsonify(response.json())

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    # Run the Flask server
    app.run(host='0.0.0.0', port=3100)
