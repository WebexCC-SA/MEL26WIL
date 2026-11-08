# Webex Contact Center Flow Builder and IVR Design

**LABCOL - 1711**

**Speakers:** Manjunath Junnur

---

## Before You Begin: Lab Login & Testing Instructions

### 1. Log in to Cisco Control Hub

Before starting the lab tasks, retrieve your Control Hub login credentials from your assigned lab session by simply connecting to workstation webRDP and it will have all the sessions details, in case you don’t find those details use below logic:

#### Step 1: Find Your Organization Domain

1. Open your assigned lab session.
2. Navigate to the **Info** tab.
3. Locate the DNS entry details.

Example DNS entry:

```
mail1.cb476.dc-01.com
```

Your Organization domain is the DNS entry without the `mail1.` prefix.

Organization domain: `cb476.dc-01.com`

#### Step 2: Determine Your Username

The administrator username is the same for all lab sessions:

```
cholland
```

Use the following format to construct your Control Hub login username:

```
cholland@<org-domain>
```

Example:

```
cholland@cb476.dc-01.com
```

#### Step 3: Determine Your Password

Your password is generated using your assigned Session ID.

Password format: its same for both Control hub and Agent login

```
DcloudXXXX!
```

Replace `XXXX` with the last four digits of your Session ID.

Example:

| Detail | Value |
|---|---|
| Session ID | 1368644 |
| Last four digits | 8644 |
| Password | `Dcloud8644!` |

#### Step 4: Sign In

1. Open Cisco Control Hub using the lab-provided URL.
2. Enter your generated username.
3. Enter your session-specific password.
4. Complete the sign-in process.

> **Note:** Use the credentials corresponding to your assigned lab session.

### 2. Lab Testing: Verify the Call Flow

The lab workstations have the Webex app configured with phone service, which can be used to test your lab configuration.

#### Testing Procedure

1. Open the Webex app on the lab workstation.
2. Navigate to the dial pad.
3. Dial the assigned channel number.
4. Verify that the call connects successfully.
5. Follow the configured call flow and validate the expected prompts, menu options, routing, and call handling.

**Expected Result:** The call should follow the configured call flow and behave as expected based on your lab setup.

### Quick Reference

| Item | Instructions |
|---|---|
| Organization domain | Extract from the DNS entry in the Info tab |
| Admin username | `cholland` |
| Login username | `cholland@<org-domain>` |
| Password (same for agent as well) | `Dcloud` + last 4 digits of Session ID + `!` |
| Testing device | Lab workstation |
| Testing application | Webex with phone service |
| Test destination | Assigned channel number |

> **Security Reminder:** Lab credentials are session-specific. Do not share your login credentials with others.

---

## Learning Objectives

Upon completion of this lab, you will be able to:

- Create the routing objects behind an inbound call in Webex Contact Center: a team, a queue, and business hours.
- Build a multi-branch IVR in Flow Designer using Business Hours, Menu, Collect Digits, Play Message, Set Variable, Condition, Queue Contact, and Play Music activities.
- Use a flow variable and expressions to limit menu retries.
- Validate and publish a flow, then link it to a phone number through a channel.
- Sign in to Agent Desktop with WebRTC (browser voice) and test every caller path end to end.

## Scenario

In this lab you build the phone system for **Cisco Live Coffee Co.**, a coffee shop at the event. Customers call one number. The IVR must:

- Check whether the shop is open.
- Offer a main menu: **1** for order status, **2** to talk to a barista, **3** for store information.
- For order status, collect a 5-digit order number and read it back.
- For a barista, queue the call to your agent team with hold music.
- Give the caller one retry after a wrong key or no input, then end the call politely on a second failure.

You build every object yourself, from the team to the channel. Then you sign in as an agent in Agent Desktop and place test calls from your mobile phone.

> **Naming rule:** your instructor assigns a learner ID, such as **L01**. Replace `L01` with your ID in every name. Use uppercase and underscores, with no spaces.

## Lab Access

| Item | Details |
|---|---|
| Control Hub | `https://admin.webex.com` |
| Agent Desktop | `https://desktop.wxcc-us1.cisco.com` |
| Username (both) | It will be based on the session you started working. Please refer first page for Control hub and agent login details. |
| Lab phone number | **+1 442 285 0953(Just an exmaple here)** — Workstations which you logged have Webex app make calls to this number. |



## Task 1: Create the Routing Objects (10 minutes)

In this task you create the team that receives calls, the queue that holds callers, and the business hours that the IVR checks.

### Step 1: Sign in to Control Hub

1. Open Chrome or Edge and go to `https://admin.webex.com`.
2. Enter `xyz@cb434.dc-01.com` and click **Sign in**.
3. Enter the password and click **Sign in**.
4. In the left menu, under **Services**, click **Contact Center**.
   - If you see only icons, click **☰** at the top left to show the labels.

> **Note:** As mentioned Control logins based on the session which you started so make sure you refer first page for login details of control hub or Agent login.

### Step 2: Create the team and add the agent

1. Click **User management > Teams**, then click **Create team**.
2. Enter these values:

   | Field | Value |
   |---|---|
   | Name | `CL_L01_TEAM` |
   | Parent site | Site-1 |
   | Team type | Agent based |
   | Desktop layout | Global Layout (default) |

3. In **Agents**, type `Anita`. Tick `anita@xyz.wbx.ai` in the results, then click empty space to close the list.
4. Click **Create**. A green success message confirms the team was created.

### Step 3: Create the queue

1. Click **Customer experience > Queues**, then click **Create queue**.
2. Enter these values:

   | Field | Value |
   |---|---|
   | Name | `CL_L01_QUEUE` |
   | Channel type | Telephony (Inbound) |
   | Queue routing type | Longest available agent |
   | Call distribution | Click **Create a group**. In Group 1, select `CL_L01_TEAM` only. Click **Save** |
   | Service level threshold | 20 seconds |
   | Maximum time in queue | 300 seconds |
   | Default music in queue | `defaultmusic_on_hold.wav` |

3. Leave all other fields at their defaults and click **Create**.

### Step 4: Create the business hours

1. Click **Customer experience > Business hours**, then click **Create business hours**.
2. Enter these values:

   | Field | Value |
   |---|---|
   | Name | `CL_L01_HOURS` |
   | Timezone | America/Los_Angeles |

3. Click **Add shift** and enter:

   | Field | Value |
   |---|---|
   | Name | AllDay |
   | Days | All 7 days |
   | Hours | 12:00 AM to 11:59 PM |

4. Click **Save**.

> **Verification:** Search for each object by name and open it. Check that:
>
> - `CL_L01_TEAM` contains the agent.
> - `CL_L01_QUEUE` Group 1 is `CL_L01_TEAM`.
> - `CL_L01_HOURS` covers all 7 days.

---

## Task 2: Build the Coffee Co. IVR in Flow Designer (20 minutes)

This is the core of the lab. You add 15 activities, configure them, connect them, and publish the flow.

Before you start the step 1 activity, check below, these are some of the steps you repeat multiple times to read carefully before start creating flow.

**Rename an activity:** click the activity's title. In the right panel, click the **pencil** beside **Activity label**, type the new name, and click **✓**. Pressing Enter alone may not save the name.

**Add a spoken prompt (TTS):**

1. Turn on **Enable text-to-speech**.
2. Set **Connector** to **Cisco Cloud Text-to-Speech**.
3. Click **Add text-to-speech message** and type the text.
4. Delete any empty **Audio file** row with its trash-can icon.

### Step 1: Create the flow and the variable

1. In Control Hub, click **Customer experience > Flows**.
2. Click **Manage flows > Create flows**, then select **Flow > Start fresh**.
3. Name the flow `CL_L01_COFFEE_FLOW` and click **Create flow**.
4. Flow Designer opens in a new tab. If the browser blocks it, allow pop-ups.
5. Click empty canvas. In the right panel (**Global Flow Properties**), click **Add flow variable** and enter:

   | Field | Value |
   |---|---|
   | Name | `retryCount` |
   | Type | Integer |
   | Default value | 0 |

6. Click **Save**.

### Step 2: Add and configure the activities

For each row below:

1. Search for the type in the activity library on the left.
2. **Drag** the activity onto the canvas. Clicking does not add it.
3. Rename it to the label shown.
4. Configure the settings shown.

#### Flow Designer Configuration

| # | Activity Type | Activity Label | Configuration |
|---|---|---|---|
| 1 | Business Hours | `CheckHours` | Choose **Static business hours**.<br>Business Hours: `CL_L01_HOURS` |
| 2 | Menu | `MainMenu` | **Text-to-Speech (TTS):** Configure the prompt as specified below.<br><br>"Welcome to Cisco Live Coffee Co. To check the status of an order, press 1. To speak with a barista, press 2. For store location and hours, press 3."<br><br>**Make Prompt Interruptible:** don’t check<br>**Custom menu links:** Add three options: 1 – Order Status, 2 – Barista, 3 – Store Info.<br>**No-Input Timeout:** 5 seconds. |
| 3 | Collect Digits | `OrderNumber` | **TTS:** "Please enter your five digit order number, followed by the pound key."<br>**Minimum Digits:** 5<br>**Maximum Digits:** 5<br>**Terminator:** #<br>**No-Input Timeout:** 5 seconds<br>**Inter-Digit Timeout:** 3 seconds |
| 4 | Play Message | `OrderStatus` | **TTS:** "Thank you. Your order number `{{OrderNumber.DigitsEntered}}` is being prepared and will be ready in about ten minutes. Goodbye." |
| 5 | Play Message | `InvalidOrder` | **TTS:** "Sorry, we did not receive a valid five digit order number. Returning to the main menu." |
| 6 | Play Message | `StoreInfo` | **TTS:** "We are in the World of Solutions hall, open every day from seven a.m. to seven p.m. Returning to the main menu." |
| 7 | Play Message | `ClosedMsg` | **TTS:** "Our store is currently closed. Please call back during business hours. Goodbye." |
| 8 | Play Message | `RetryPrompt` | **TTS:** "Sorry, that was not a valid choice. Let's try again." |
| 9 | Play Message | `GoodbyeMsg` | **TTS:** "We are having trouble understanding your selection. Please call back later. Goodbye." |
| 10 | Play Message | `BusyMsg` | **TTS:** "All of our baristas are busy right now. Please call back in a few minutes. Goodbye." |
| 11 | Set Variable | `IncrementRetry` | **Variable:** `retryCount`<br>**Value:** `{{retryCount + 1}}` |
| 12 | Condition | `RetryCheck` | **Expression:** `{{retryCount < 2}}` |
| 13 | Queue Contact | `QueueToBarista` | **Static Queue:** `CL_L01_QUEUE` |
| 14 | Play Music | `HoldMusic` | **Static Audio File:** `defaultmusic_on_hold.wav`<br>**Duration:** 60 seconds |
| 15 | Disconnect Contact | `DisconnectContact` | Nothing to configure. |

> **Note:** Use the label `GoodbyeMsg`, not `Goodbye`. The label `Goodbye` fails validation as a duplicate.

> **Tip:** In `OrderStatus`, you can insert the variable with the **{x}** button instead of typing it.

### Step 3: Connect the activities

Close the right panel (**✕**) so it does not cover the canvas. To draw a connection, press and hold on a source output port (the dot on the right edge of the activity) and drag it to the destination's input port (left edge). To remove a wrong connection, click it and press **Delete**.

| # | From (Activity) | Output Port | To (Activity) |
|---|---|---|---|
| 1 | NewContact | out | CheckHours |
| 2 | CheckHours | Working Hours | MainMenu |
| 3 | CheckHours | Holidays | ClosedMsg |
| 4 | CheckHours | Override | ClosedMsg |
| 5 | CheckHours | Default | ClosedMsg |
| 6 | MainMenu | 1 | OrderNumber |
| 7 | MainMenu | 2 | QueueToBarista |
| 8 | MainMenu | 3 | StoreInfo |
| 9 | MainMenu | No-Input Timeout | IncrementRetry |
| 10 | MainMenu | Unmatched Entry | IncrementRetry |
| 11 | OrderNumber | out | OrderStatus |
| 12 | OrderNumber | No-Input Timeout | InvalidOrder |
| 13 | OrderNumber | Unmatched Entry | InvalidOrder |
| 14 | InvalidOrder | out | MainMenu |
| 15 | StoreInfo | out | MainMenu |
| 16 | IncrementRetry | out | RetryCheck |
| 17 | RetryCheck | True | RetryPrompt |
| 18 | RetryCheck | False | GoodbyeMsg |
| 19 | RetryPrompt | out | MainMenu |
| 20 | QueueToBarista | out | HoldMusic |
| 21 | QueueToBarista | Failure | BusyMsg |
| 22 | HoldMusic | out | BusyMsg |
| 23 | OrderStatus | out | DisconnectContact |
| 24 | ClosedMsg | out | DisconnectContact |
| 25 | GoodbyeMsg | out | DisconnectContact |
| 26 | BusyMsg | out | DisconnectContact |
| 27 | Every Activity | Undefined Error | DisconnectContact |

Click **Fit to screen** in the bottom toolbar. Check that no output port is left unconnected. `DisconnectContact` has no outputs.

### Step 4: Validate and publish

1. Turn on the **Validation** switch at the bottom right.
2. Fix every **Error**. Recommendations can be ignored.

   | Error | Resolution |
   |---|---|
   | Port not connected | Draw the missing line |
   | Required field | Fill in the field named in the error |
   | Duplicate label | Rename the activity |

3. When validation shows 0 errors, click **Publish Flow**.
4. Enter the comment `L01 v1`, keep the label **Latest**, and click **Publish Flow**.

> **Verification:** In Control Hub, open **Flows**, refresh, and confirm `CL_L01_COFFEE_FLOW` shows **Published**.

---

## Task 3: Create the Channel and Sign In the Agent (7 minutes)

The channel links the phone number to your flow. The agent must be **Available** on your team to receive option-2 calls.

### Step 1: Create the channel

1. In Control Hub, click **Customer experience > Channels**, then click **Create a channel**.
2. Enter these values:

   | Field | Value |
   |---|---|
   | Name | `CL_L01_EP` |
   | Channel type | Inbound telephony |
   | Service level threshold | 20 |
   | Timezone | Default |
   | Routing flow | `CL_L01_COFFEE_FLOW` |
   | Music on hold | `defaultmusic_on_hold.wav` |
   | Version label | Latest |

3. Under **Phone numbers**, click **Add** and select:

   | Field | Value |
   |---|---|
   | Location | Site1 |
   | PSTN number | +14422850953 (This number is just an exmaple, so you will use whatever number is availble while you configure, later same number you use to test) |
   | Media region | United States (Default) |

4. Click **✓** on the number row, then click **Create**.

### Step 2: Sign in to Agent Desktop with WebRTC

Open a new tab and go to `https://desktop.wxcc-us1.cisco.com`. Sign in as `anita@xyz.wbx.ai`.

- **Handle calls using:** Desktop (WebRTC browser voice)
- **Team:** `CL_L01_TEAM`

1. Click **Save**.
2. When the browser asks for the microphone, click **Allow**. Make sure your headset is selected.
3. If the desktop opens without the **Station login** dialog:
   - Click the avatar at the top right, then **Profile Settings**.
   - Set **Your team** to `CL_L01_TEAM` and click **Save**.
4. In the state dropdown at the top, choose **Available**.

> **Note:** username here will be same one which you assigned in Teams.
> Example: `anita@xyz.wbx.ai`. Same can be found from contact center **Users** tab, once you open it will be email address, you can use the same as agent username. For password refer to the first page.

> **Verification:** The desktop shows **Available**, with team `CL_L01_TEAM`.

---

## Task 4: Test the IVR (8 minutes)

Dial **+1 442 285 0953** from workstation. Start a new call for each test and use the phone keypad.

### Step 1: Verify the self-service paths

| Step | Action | Result |
|---|---|---|
| 1 | Press 1, enter 12345 | The order number is read back, then the call ends |
| 2 | Press 1, enter 12 and wait | The InvalidOrder message plays, then the main menu returns |
| 3 | Press 3 | Store information plays, then the main menu returns |
| 4 | Press 9, then 9 again | First the retry message, then the goodbye message, then the call ends |

### Step 2: Verify the agent path

| Step | Action | Result |
|---|---|---|
| 5 | Agent Available. Press 2 | Hold music plays and Agent Desktop rings. Click **Accept** and confirm two-way audio. Click **End**, then **Submit Wrap Up** |
| 6 | Agent set to Meeting or Idle. Press 2 | About 60 seconds of hold music, then the busy message, then the call ends |

**Why test 4 ends the call:**

- `retryCount` starts at 0.
- The first wrong key sets it to 1. Because 1 < 2, the caller gets a retry.
- The second wrong key sets it to 2. Because 2 < 2 is false, the goodbye message plays.

### Step 3: Clean up

1. In Agent Desktop, set the state to **Idle**.
2. Tell the instructor you have finished or end the lab once done.

---

## Troubleshooting

| Symptom | Resolution |
|---|---|
| You hear another learner's IVR or the reference IVR | The number is on another channel; move it to `CL_L01_EP` |
| You hear the closed message | Check that `CL_L01_HOURS` covers all 7 days, 12:00 AM–11:59 PM |
| Your changes are not heard | Publish the flow again with the label **Latest** |
| Order number is not read back | Use `{{OrderNumber.DigitsEntered}}` exactly; the activity label must be `OrderNumber` |
| Hold music plays but the agent never rings | Agent must be **Available** on `CL_L01_TEAM`; queue Group 1 must be `CL_L01_TEAM` |
| No audio on the agent side | Allow the microphone (browser padlock icon) and select your headset |
| State changes to Meeting by itself | Set it back to **Available** |
