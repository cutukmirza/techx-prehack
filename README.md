# techx-prehack

## WATSONCARE - A Smart Insurance Solution 
WATSONCARE aims to revolutionize the insurance industry by leveraging AI to deliver hyper-personalized offers for clients. The current insurance landscape is highly competitive, with customers expecting tailored experiences that align with their unique needs and circumstances. However, traditional insurance offerings often rely on rigid, one-size-fits-all models that don't account for individual preferences or lifestyles. Watsoncare bridges this gap by using AI to analyze a customer’s profile in real time, enabling insurance agents to generate customized offers that go beyond conventional policies. This approach enhances customer satisfaction, increases sales opportunities, and strengthens customer loyalty.

## Frontend
Frontend was built using react-native expo, so it could easily be adapted to be used on mobile phones as well. 

## Backend 
We built a small python proxy server that acts as a median between watsonx on IBM Cloud and our frontend.

## AI Application
We used granite-13b-instruct-v2 for two steps:
- identification of upsell opportunities for insurance products, insurance add-ons and partner offers
- generation of personalized communications for the selected client

## Future Work
There are so many different features that could be implemented in this solution, such as:
- AI assisted ticket responses (AI summarizes the client policy, cross-checks it with the question and attempts to answer. The agent then only approves or tweaks the response slightly)
- Insurance products assistant (Insurance agents in big insurance companies can't keep track of all the possible offers, so an assistant that knows all of them would be awesome, and it would also help significantly to the new hires)
- Proactive personalized client engagement
- Predictive coverage based on industry trends
