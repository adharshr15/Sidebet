# Sidebet
IRL Betting App designed to track bets made between friends, complete with payout feature and debt tracking

Core Features:
- User account creation
- Users can have friends, groups
- groups contain a group of users
- each group has a current winner (person with lowest debt/highest earnings)
- group has a payout button that when approved by everyone in group will payout earnings from paypal/venmo to each person in group

Technical Requirements:
- Platform: Swift/SwiftUI
- Backend: Firebase
- Storage: Azure/Cloud Storage
- API's: Notifications, Friends, Groups, Messaging(?), Payouts,

Front-end:
- User Auth: use user's phone #/ email
- Bet Creation: Bets w customizable options (Terms, Over/Under etc)
- Notifications: Use Apple Push Notification Service (APNS)
- Friend/Group Management: Add friends, join groups, remove friends, leave groups
- Tap-To-Bet Feature

Back-end:
- Create Schemas for users, friends, groups, bets, notifications
- Bet logic: handle bet creation, acceptance, resolution\
- Ensure Real-Time updates using Firebase
- Ensure Data Security w payment information (Use third party like paypal maybe)
