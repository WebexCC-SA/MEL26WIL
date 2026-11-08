Webex Contact Center: AI Assistant for Agents Lab

Estimated time: 30 minutes

Before you begin : Once you start the session, First get into workstation web RDP, It will have all session details and CH+User login credentails. 

Learning Objectives

Upon completion of this lab, you will be able to:

• Turn on the Cisco AI Assistant features for Webex Contact Center in Control Hub.
• Enable real-time transcripts for voice calls by adding one activity to an existing flow.
• Give agents AI-powered Real-time Assist backed by a simple knowledge base.
• Use AI-generated mid-call and post-call summaries with suggested wrap-up codes.
• Explain how call drop summaries, sentiment and Auto CSAT add insight to every interaction.

Scenario

The Cisco Live contact center is already running: callers dial in, hear a welcome message, and are queued to an agent on team CiscoLive2. Agents take each call "cold", type their own wrap-up notes, and pick a wrap-up code by hand.

In this lab you add the Cisco AI Assistant on top of that existing setup, without rebuilding anything.

Business need	AI feature
See what the caller is saying, live	Real-time transcripts
Help newer agents give the right answer	Real-time Assist (AI suggestions from a knowledge base)
Quick context during a call, or for a supervisor or consult	Mid-call summary
Less after-call work and consistent coding	Post-call summary with suggested wrap-up code
Context when a caller gets cut off and calls back	Call drop summary
Satisfaction insight on every call, without surveys	Auto CSAT and Sentiment analysis

Pre-configured Objects

Use these objects. Do not create new ones.

Object	Name	Notes
Channel	Cisco Live	Inbound telephony, number +1 502 237 7363, version label Live
Queue	Cisco Live	Longest available agent, team-based
Team	CiscoLive2	Agents: Anita Perez, Kellie Melby (Site-1)
Flow	Cisco_Live	WelcomePrompt > Queue Contact > hold music

Note: The flow is listed in Control Hub as Cisco_Live. It is the flow used by the Cisco Live channel.

Lab Access

Item	Value
Control Hub	https://admin.webex.com (sign in as cholland@cb472.dc-01.com)
Agent Desktop	https://desktop.wxcc-us1.cisco.com (sign in as aperez@cb472.dc-01.com, Anita Perez)
Passwords	Provided by the instructor
Test number	+1 502 237 7363

You need a laptop with Chrome or Edge, a headset and a mobile phone. Use a separate browser profile or an incognito window for Agent Desktop, so the admin and agent sessions don't mix.

Network Diagram

Caller (mobile) ──► +1 502 237 7363 ──► Channel "Cisco Live" (label: Live)
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Flow "Cisco_Live"                                                   │
│  Main flow : NewPhoneContact ► WelcomePrompt ► QueueContact ► Music │
│  Event flow: AgentAnswered ► MediaStreamAI ► ScreenPop ► End Flow   │
│              (Start Media Stream - added in this lab)               │
└───────────────┬────────────────────────────────────┬────────────────┘
                │ audio sent when agent answers      │ call
                ▼                                    ▼
┌────────────────────────────────────┐   ┌──────────────────────────────┐
│ Cisco AI Assistant (cloud)         │   │ Queue "Cisco Live"           │
│  • Real-time transcription         │   │  AI: summaries, transcripts, │
│  • Sentiment / Auto CSAT           │   │      sentiment, Auto CSAT,   │
│  • Mid-call, wrap-up, call drop    │   │      Real-time Assist skill  │
│    summaries + suggested wrap code │   └──────────────┬───────────────┘
│  • Real-time Assist ◄─ AI Agent    │                  ▼
│    Studio skill + knowledge base   │   ┌──────────────────────────────┐
└─────────────────┬──────────────────┘   │ Team "CiscoLive2"            │
                  └── AI Assistant ─────►│ Agent Desktop (WebRTC)       │
                      panel              └──────────────────────────────┘

Task 1: Turn On the AI Features (5 minutes)

All AI features start off in this tenant. You turn them on for the organization, then confirm that the Cisco Live queue picks them up.

Step 1: Enable the global AI features

1. Sign in to https://admin.webex.com as cholland@cb472.dc-01.com.
2. In the left menu, click Contact Centre.
3. Under Desktop experience, click AI features. Stay on the Global tab.
4. Turn on each feature in the table below. The Apply to all queues switch turns on automatically. Leave it on.

Section	What to turn on
Auto CSAT	Auto CSAT
Generated summaries	Generated summaries, then tick Mid-call summaries, Call drop summaries, and Wrap-up summaries with auto-suggested wrap-up reason
Real-time transcriptions	Real-time transcriptions
Sentiment analysis	Sentiment analysis
Real-time assistance	Real-time assistance
AI routing, Agent Wellbeing	Leave off (not part of this lab)

5. Click Save (bottom right) and wait for the "updated successfully" message.

Step 2: Check the queue

1. Click the Queue tab, then click Cisco Live.
2. Confirm that Auto CSAT, Generated summaries, Real-time transcriptions and Sentiment analysis show Global settings applied, with their switches on.
    • If any Apply switch is off, turn it on and click Save.
3. Leave Real-time assistance for now. It needs a skill, which you create in Task 2.

Note: Summary types are managed only at the global level. Every queue inherits them.

Task 2: Create a Real-time Assist Skill (8 minutes)

Real-time Assist listens to the call and suggests what the agent should say, using a knowledge base you provide.

Step 1: Create the knowledge base

1. In Control Hub, click Contact Centre > Customer experience > AI Agents, then click Build your AI Agent. Webex AI Agent Studio opens in a new tab. Allow pop-ups if asked.
2. In the left menu, click Knowledge (database icon), then click Create knowledge base.
3. Enter the knowledge base details from the table below and click Create.
4. Click Add an article and enter the article details from the table below.
5. Click Add source. The status changes from Queued for Processing to ready in a minute or two. Carry on while it processes.

Screen	Field	Value
Create knowledge base	Name	CiscoLive_KB
Create knowledge base	Description	Cisco Live Coffee Co. menu, hours and order policies
Add an article	Source name	Cisco Live FAQ
Add an article	Description	Menu, hours and order policies (required: Add source stays grey without it)
Add an article	Article body	Paste the FAQ text below

FAQ text to paste:

Cisco Live Coffee Co. - FAQ

HOURS AND LOCATION
- World of Solutions hall, next to the Cisco booth. Open daily 7:00 AM - 7:00 PM.

MENU
- Latte $4.50 / $5.00. Cappuccino $4.25 / $4.75. Cold brew $4.25 / $4.75.
- Flavours: vanilla, caramel, hazelnut (+$0.50). Plant milks (oat, almond, soy) +$0.60.

ALLERGENS
- Almond milk and hazelnut syrup contain tree nuts.
- Croissants and muffins contain gluten, egg and dairy.

ORDERS AND REFUNDS
- Every order has a 5-digit order number. Normal preparation time is 10 minutes.
- If an order is more than 15 minutes late, apologise and offer a free replacement drink or a full refund.
- Refunds go back to the original payment method in 3-5 business days.
- Always confirm the 5-digit order number before a refund or replacement.

Step 2: Create and publish the skill

1. In the left menu, click AI Assistant skills, then click Create skill > Start from scratch.
2. Enter the skill details from the table below and click Create.
3. In Instructions, paste the instruction text below, then click Save changes.
4. Click the Knowledge tab, select CiscoLive_KB, and click Save changes.
5. Click Publish, enter the comment v1, and click Publish. The badge changes to Published.

Field	Value
Skill name	CiscoLive_Assist
Goal	Help Cisco Live agents answer questions about orders, menu, allergens and store hours, and resolve order issues politely.

Instruction text to paste:

Suggest short, friendly replies for the agent. Use the knowledge base for prices, allergens, hours and refund policy - never invent them. For late orders, confirm the order number and offer a replacement or refund. If the customer is upset, suggest an apology first.

Task 3: Assign the Skill and Add Wrap-up Codes (5 minutes)

Step 1: Turn on Real-time assistance for the queue

1. Back in Control Hub, go to Desktop experience > AI features > Queue > Cisco Live.
2. Under Real-time assistance, turn on Apply Real-time assistance.
3. In Select a skill, choose CiscoLive_Assist, then click Save.

Step 2: Add wrap-up codes the AI can suggest

The tenant has only one wrap-up code, Sale. Add three call reasons so the AI has meaningful codes to suggest.

1. Go to Desktop experience > Idle/wrap-up codes.
2. Click Create an idle/wrap-up code.
3. Enter the Name from the table below and set Code type to Default Wrapup Work Type.
4. Click Create.
5. Repeat steps 2 to 4 for each wrap-up code in the table.

Name	Code type
Order Status	Default Wrapup Work Type
Order Issue - Refund	Default Wrapup Work Type
Menu and Allergens	Default Wrapup Work Type

Note: Use only letters, numbers, spaces and . _ - in names. The & character is not allowed. The agents' desktop profile (dCloud) gives access to all wrap-up codes, so the new codes appear automatically.

Task 4: Stream Call Audio to the AI (5 minutes)

Transcripts, Real-time Assist, sentiment and summaries all need the call audio. Add Start Media Stream to the flow's AgentAnswered event, so the audio is sent to the AI as soon as the agent answers.

Important: Put Start Media Stream in the Event flows canvas, not in the main flow before Queue Contact. In the main flow it fails, and the agent sees "Live transcription isn't available for this call."

Step 1: Add the activity

1. Go to Customer experience > Flows. On Cisco_Live, click Go to Flow Designer.
2. Turn Edit to On.
3. Click the Event flows tab. Find AgentAnswered, which currently goes to ScreenPop_sd8.
4. Click the link from AgentAnswered to ScreenPop_sd8, then click Delete link.
5. In the Activities library, search for Start Media. Drag Start Media Stream next to AgentAnswered.
6. Click the new activity, click the pencil icon next to Activity label, rename it MediaStreamAI, and click the check mark. Nothing else needs configuring.
7. Draw the three links in the table below.

From	Port	To
AgentAnswered	out	MediaStreamAI
MediaStreamAI	out	ScreenPop_sd8
MediaStreamAI	Failure	ScreenPop_sd8

Note: Sending Failure onward means that if streaming fails, the call still continues normally.

Step 2: Validate and publish with the Live label

1. Turn on Validation and confirm Ready to publish.
2. Click Publish Flow.
3. In Select version labels, add Live. Latest is applied automatically.
4. Enter a comment, such as AI media stream, and click Publish Flow.

Important: The Cisco Live channel uses the Live label. If you skip it, calls keep running the old version of the flow.

Task 5: Test as an Agent (7 minutes)

Step 1: Sign in to Agent Desktop

1. In an incognito window, open https://desktop.wxcc-us1.cisco.com and sign in as aperez@cb472.dc-01.com.
2. In Station login, enter the values in the table below, then click Save.
3. Click Allow for the microphone, then set your state to Available.

Station login field	Value
Handle calls using	Desktop
Team	CiscoLive2

Step 2: Live transcript and Real-time Assist

1. From your mobile, call +1 502 237 7363 and listen to the welcome message.
2. Click Accept on the desktop.
3. As the customer, say: "My order number is one two three four five. It's twenty minutes late. Also, does the hazelnut latte have nuts?"
4. Check the results in the table below.

Where to look	Expected result
Live transcript tab	Both speakers' words appear live
AI Assistant panel (right side)	Suggestions to apologise, offer a replacement or refund, and warn that hazelnut contains tree nuts

Step 3: Mid-call and post-call summary

1. During the call, click Summary in the AI Assistant panel to generate a mid-call summary.
2. Say "I've refunded your order" and click End.
3. In Wrap Up Reasons, check the results in the table below.
4. Click Submit Wrap Up.

Field	Expected result
Summary of your conversation	Filled in by the AI
AI-suggested	A wrap-up code is suggested, which should be Order Issue - Refund

Step 4: Call drop summary

1. Go Available, call again, accept the call and talk briefly about a wrong drink.
2. Hang up from the mobile phone without saying goodbye, then submit wrap-up.
3. Call back from the same mobile and accept. The AI Assistant panel shows a summary of the dropped call.

Step 5: Auto CSAT and sentiment

Auto CSAT and sentiment are calculated after each call ends. Ask the instructor to show them in reporting for the Cisco Live queue.

Verification Checklist

Done	Item
☐	Global AI features on: Auto CSAT, Generated summaries (mid-call, call drop, wrap-up), Real-time transcriptions, Sentiment analysis, Real-time assistance
☐	Queue Cisco Live inherits the features, and Real-time assistance uses CiscoLive_Assist
☐	CiscoLive_KB has the FAQ article, and CiscoLive_Assist is Published
☐	Wrap-up codes Order Status, Order Issue - Refund and Menu and Allergens exist
☐	Flow Cisco_Live is published with label Live: AgentAnswered > MediaStreamAI > ScreenPop_sd8
☐	Live transcript, AI suggestion, mid-call summary, and wrap-up summary with suggested code all seen
☐	Call drop summary seen on callback

Troubleshooting

Symptom	Fix
"Live transcription isn't available for this call"	Start Media Stream must be on the AgentAnswered event in Event flows. Check that the flow was published with the Live label. In Flow Designer Debug, confirm MediaStreamAI shows Success.
No AI suggestions	Check the queue has Real-time assistance on with CiscoLive_Assist, the skill is Published, and the knowledge source has finished processing.
Skill not listed in Select a skill	Publish the skill, then reload Control Hub.
Add source button is greyed out	Fill in the article Description.
No AI-suggested wrap-up code	Check that Wrap-up summaries with auto-suggested wrap-up reason is ticked. Have a real conversation of 20+ seconds.
Agent never rings	Check the agent is Available on team CiscoLive2.
Duplicate-label validation error	Rename the activity to a unique label, for example MediaStreamAI2.
