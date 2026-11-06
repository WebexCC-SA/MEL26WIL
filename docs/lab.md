
# Lab Objective

The objective of this lab is to provide hands-on experience with the Webex Campaign Management module within Webex Contact Center. Learners will configure and optimize outbound communication campaigns using Control Hub, focusing on agent-assisted and agentless IVR campaigns. Participants will practice key tasks such as dialing schedule management, contact list handling, applying suppression rules, and enforcing compliance settings to ensure effective and regulatory-compliant campaign execution.

Upon completion of this lab, you will be able to test the webex campaign calls.

## 1.- Overview of Webex Contact Center and Webex Native Campaign Manager

A high-level architecture flow of different modules associated with Control Hub within Webex Contact Center.

![A diagram of a process AI-generated content may be incorrect.](assets/docx-image-001.png)

### User Lab Access Details

**1. Administrator Access**

|  |  |
| --- | --- |
| **Field** | **Details** |
| **Login URL** | <https://admin.webex.com/> |
| **Username** | admin@wbharsh.wbx.ai |
| **Password** | jbSg59Mm9! |

**2. Agent Access Details**

|  |  |  |
| --- | --- | --- |
| **Sl. No.** | **Agent Username** | **Password** |
| 1 | userlive1@wbharsh.wbx.ai | Apple@123 |
| 2 | userlive2@wbharsh.wbx.ai | Apple@123 |
| 3 | userlive3@wbharsh.wbx.ai | Apple@123 |
| 4 | userlive4@wbharsh.wbx.ai | Apple@123 |
| 5 | userlive5@wbharsh.wbx.ai | Apple@123 |
| 6 | userlive6@wbharsh.wbx.ai | Apple@123 |
| 7 | userlive7@wbharsh.wbx.ai | Apple@123 |
| 8 | userlive8@wbharsh.wbx.ai | Apple@123 |
| 9 | userlive9@wbharsh.wbx.ai | Apple@123 |
| 10 | userlive10@wbharsh.wbx.ai | Apple@123 |

## 2.- [Environment Setup](https://circuit.cisco.com/app/home#2-environment-setup) Webex Contact center

To prepare for campaign creation, you must set up the following prerequisites in Webex Contact Center and create the required **Global variables**

![](assets/docx-image-002.png)

Create the **Global Variables** that you will be going to use on the Campaigns

Go to **Flows** on Control hub and select “global variables” and create the next “global variables” used in the contact list

Variables: phone, first name, last name, email\_address

**Follow the naming convention as per your choice.**

Example: EM\_<Campaign\_type>\_Team | campaign name: EM\_Standard\_Preview

**Step** 1: Create a **Team** for the Standard Preview Campaign.![](assets/docx-image-003.png)

* On this team assign an active user to that Campaign team

**Creating a new Queue**

Select Create a **Queue** and fill the information as the next

**Note:** pay attention on the type of “contact direction this must be “**Outbound queue**” is automatically set

**![](assets/docx-image-004.png)**

Assign the team created and fill the data and click on create

**![](assets/docx-image-005.png)**

**![](assets/docx-image-006.png)**

**Creation of Flow**

Go to **Flows** in Webex contact center left panel and click on “**manage flows**” and click on create

![](assets/docx-image-007.png)

Select “**templates**”

![](assets/docx-image-008.png)

In the search box find “campaign” template and select the “**outbound Preview Campaign**” and click on “**next**”

![](assets/docx-image-009.png)

Set a name as we describe above i.e.: EM\_StandardPreview\_flow

And click on “**create flow** “  
  
on the new flow created verify the **desktop Viewability & Order** options here you will see the incoming pop over data

![](assets/docx-image-010.png)

**Note:** The template includes default global variables. When creating your flow, remove any unnecessary variables before proceeding

**Save** & **publish** the flow

**Creation of Outbound EP/Channel**

Go to EP/channels and create a new Channel and fill in the configuration as the next example

![](assets/docx-image-011.png)

**Set the fields as in the following example using the elements already created.**

* **Name** : EM\_StandardPreview\_EP
* **Channel type :** Outbound telephony
* **Routing Flow :** EM\_StandardPreview\_flow
* **Outbound Queue :** EM\_StandardPreview\_Q

## 2.1 Accessing to Local Webex campaign management portal

To assess your Campaign manager, you will need to use the URL below.

<https://campaignmanager.wxcc-us1.cisco.com/nextgen/login?orgId=613969ee-b9bb-4b9d-af2f-e6a7f45346b7>

**Note:** use your Full Local Admin credentials ([admin@wbharsh.wbx.ai](mailto:admin@wbharsh.wbx.ai), jbSg59Mm9!)

Click **Accept** and continue with the home page of the Native campaigns.   
When you click Webex Campaign in your tenant, it opens the application. It displays the mandatory setup steps for each section that needs to be completed.  
  
![A screenshot of a chat

AI-generated content may be incorrect.](assets/docx-image-012.png)

Click on “**Got it”** and proceed to setup the list of elements provided.

We can follow the guide below to set up everything needed before creating new campaigns:

<https://docs-campaign-for-contact-centers.webexcampaign.com/docs/business-days>

Review each section and ensure all required data and information for creating campaigns are complete.

**Business days**

![](assets/docx-image-013.png)

**Contact modes**

![](assets/docx-image-014.png)

Click on Create contact mode options such as **home phone**, **Office** or **mobile**.

![](assets/docx-image-015.png)

And click on **create contact mode**.  
enter a name and click on **Create**

**DNC List | DNC = (Do Not Contact) lists.**

![](assets/docx-image-016.png)

Leave on blank by testing purpose we will not use DNC on campaigns

**Field mapping**

Click on “**Create field mapping** “

![](assets/docx-image-017.png)

Use the next data to create a field mapping file with the next headers

**phone,name,lastname,email**

**copy the above line and save an .csv file this will be uploaded in the campaign**

Fill the next info

* A field mapping name
* Upload .csv file created
* Map the column headers

![](assets/docx-image-018.png)

**Section 2** : Map contact modes

Select the contact mode and the field used as contact mode as **“phone”**

![](assets/docx-image-019.png)

Move to the next option

**Click option 3**

Specify Country of all the phone number as the next

![](assets/docx-image-020.png)

**Select option 4 and leave default**

![](assets/docx-image-021.png)

**Select Option 5 Map Global variables**

Note: if you observe the variables are missing, please ensure that “refresh” option from Global variables menu

![](assets/docx-image-022.png)

**![](assets/docx-image-023.png)**

Select the global variables and assign accordingly to your “global Variables” previously created

![](assets/docx-image-024.png)

Move to the option 6 and select the “Data Types” of each variable

![](assets/docx-image-025.png)

Click on “Save Field mapping” you will be warned for leave some “global variables unmapped”, click on “save Field mapping as is” and continue with the next section this field mapping will be used on the Campaign creation.

![](assets/docx-image-026.png)

**Global variables section**

**On this section you can update to visualize latest global variables created**

**“Refresh from Control Hub”**

![](assets/docx-image-027.png)

**Organization level exclusion dates**

By default, you need to create holiday dates to avoid reach customers on holidays.

Fill as the next example **![](assets/docx-image-028.png)**

**Purpose meta-tags**

**Note:** For creating a campaign, purpose meta-tags are not mandatory. However, to activate a campaign it is mandatory.

Click on Create a purpose Meta-tag button and fill in the next info

**![](assets/docx-image-029.png)**

**P&L meta-tags**

Note: For creating a campaign, P&L meta-tags are not mandatory. However, to activate a campaign it is mandatory.

the P&L (Profit and Loss) section allows a business to assign a campaign to different divisions, cost centers, or products.

By Default, we have the P&L tag called “DEFAULT” but we can create a new for any purpose as “marketing\_test”

![](assets/docx-image-030.png)

**Telephony outcome sets**

A telephony outcome set is a collection of possible call outcomes received from the dialer when an attempt is made to contact a customer. These outcomes indicate whether a call was successfully connected, rejected, busy, or failed for various reasons during the dialing process. The system provides standard telephony outcomes expected from the dialer.

You will see Default outcome set already created by the system to allow manage this in your campaign, you need to create or duplicate to make it visible on the contact strategy section

Click on duplicate primary set

![](assets/docx-image-031.png)

And set name of this copy i.e.

EM\_Primary\_telephony\_outcome\_set once you click on duplicate a new line of the telephony outcome\_set will appear on the list as the next image

![](assets/docx-image-032.png)

**Wrap-up code sets**

Wrap-up codes are the tags applied by agents after a call to categorize and record the outcome of each customer’s interaction. These codes are defined and managed in Control Hub  
you need to create or duplicate to make it visible on the contact strategy section

Click on “create new set”

![](assets/docx-image-033.png)

![](assets/docx-image-034.png)

After creating open the created set and assign the wrap up codes needed

![](assets/docx-image-035.png)

![](assets/docx-image-036.png)

Click on add wrap-up code.

**Additional:** This section you can “refresh from Control hub” the latest Wrap up created

And continue with the next section

Note Once you review all the options and all set proceed with the campaign’s creation

On this lab you will need perform the test for the next campaigns

* Standard Preview
* IVR Campaign (Predictive)

## 3.- Campaign Management

![](assets/docx-image-037.png)  
  
 campaign group(s) must be created to deploy a campaign. A campaign group is a ‘wrapper’ within which campaigns are created. A single campaign group can be created to deploy multiple campaigns.

##

## 4.- Create Standard Preview Campaign

We will continue to use the nomenclature for campaign identification

“EM\_<campaign\_type>”

Follow these steps to create a campaign group:

* From the left menu, navigate to Campaign management > Campaign group. The campaign group list screen appears. It will display all the campaigns created in this tenant.

![](assets/docx-image-038.png)

* Click **Create campaign group**.
* On the Create campaign group screen, enter details for the following fields.
  1. **Campaign group name**: Enter a name for the campaign group.
  2. **Business stakeholder**: Enter all the stakeholders for the campaign separated by a comma. For example, Sales Team, Marketing Team, Presales, etc.
  3. **Reference ID**: Enter a unique ID for the campaign group.
  4. **Campaign image**: Add a thumbnail image for the campaign group. The size of the image should not be more than 100 x 100 px. The supported formats are .jpg, .jpeg, .png, .gif, .bmp, and .tif.
  5. **Description**: Enter a description for the campaign group.

![](assets/docx-image-039.png)

Click **Save and proceed**.

On the recent campaign group created select and open the group

![](assets/docx-image-040.png)

Follow these steps to create a campaign:

![](assets/docx-image-041.png)

On the campaign group list screen, click **Create campaign**. The campaign configuration screen appears with placeholder nodes to configure.

## 4.1.- Configure Dialer Configuration Node

On this node you need to select the EP/channel created for the campaign

* 1. EP/Channel
  2. Out dial ANI
  3. Dialing Mode: Standard Preview “campaign modes”
  4. CPA parameters: default
  5. Dialing mode: default Image below

![](assets/docx-image-042.png)

**![](assets/docx-image-043.png)**

**Notice** that the new campaign displays **warning** icons; these indicate that mandatory configuration nodes require input before the campaign can be saved.

Note: Keep CPA (Call Progress Analysis) parameters Disabled.

*Checkpoint: Verify that the 'Warning' icons on the campaign nodes have disappeared and the 'Save' button is enabled."*

## 4.2 Configure Contact list configuration Node

You will need to fill in the fields according to the data uploaded

![](assets/docx-image-044.png)

* **Select Contact List source:** You will need select the source of the contact list, we are using Manual file upload which is uploaded through the campaign options on “manage contact list” on the campaign options will review on the next section
* **Select field mapping**: you need to select “**EM\_field\_mapping** ” already uploaded in the campaign manager
* **Expiring days:** Automatically expire each contact list in **'7 days**” after its activation: use 1 for up 31 days
* click on **Save** before proceeding next node

4.3 Additional contact list options Node

<<Skip this node>>

## 4.4 Daily Schedule Node

On this node we need setup the daily schedule of the campaign

Note: set the schedule to start 15-20 minutes after the current time to ensure the campaign triggers during the test calls

![](assets/docx-image-045.png)

* click on **Save** before to proceed with next node

##

## 4.5 Campaign Holidays Node

Set default values given this is already done based on the holidays and similar dates that we already created

![](assets/docx-image-046.png)

4.6 Contact Attempts Strategy Node  
  
select “configure” icon label

![](assets/docx-image-047.png)  
select according to the data requested and fill each option per needed

1. Call outcome sets
2. Contact mode priority

This value is prepopulated based on the selected field mapping, but you can add more contact modes we use as default .

![](assets/docx-image-048.png)

![](assets/docx-image-049.png)

3.- Max call attempts allowed for a contact within a specific contact list

![](assets/docx-image-050.png)

4.- **Configure 'Sequential dialing for** this lab we will disable the option and set a “max call attempt for 2”

![](assets/docx-image-051.png)

click **Save changes**

4.7 Callback strategy Node

**Enable the toggle “Callback strategy Not Required”**

![](assets/docx-image-052.png)

4.8 Suppression Rule Sets

last node configuration to setup the “suppression Rules”

**Enable the toggle <<Suppression rules not required>>  
![](assets/docx-image-053.png)**

1. Click **Save and exit** and configure the following details:

![](assets/docx-image-054.png)

* + **Campaign name**: EM\_Standard\_preview
  + **P&L (Profit and Loss)**: your group created for identification: Default
  + **Purpose**: Campaign\_test
  + **Applicable DNC (Do Not Call) lists**: None

When you’re done you can confirm the Campaign was saved successfully and you can review the details of the campaign  
  
![](assets/docx-image-055.png)

We can proceed to visualized **and “manage the contact list “**needed to **“activate”** the Campaign

## 4.6 Test Standard Campaign

Select the “… vertical dots” and select “Manage **contact list**”   
![A screenshot of a computer

AI-generated content may be incorrect.](assets/docx-image-056.png)  
then click on **Upload file to create contact list.**

The previously created contact list must use the following header format and include the information for the **contacts you wish to reach (Please use your own mobile number or colleagues number for testing purpose).**

The file contains the next info: phone, name, last name, email

Example:

+61<101010101>,John,Hill,johnhill@xyz.com

+61<202020202>,Eddy,Gurero,eddy@gmail.com

in the next windows

![](assets/docx-image-057.png)

select browse to find the contact list desired . leave default values for the next fields.   
- If this fails to upload that means there is an issue with your contact list file , you need to verify and validate this is correct

- when you click “ save and proceed” the upload will be start and eventually will appear as “active”

![](assets/docx-image-058.png)

And now you can close this windows and proceed to active the campaign expanding the “3 dots …” and choose “Active” option   
  
![](assets/docx-image-059.png)

After “active” the campaign the status will change from “draft” to “Pending”. And eventually to “**Running**”

![](assets/docx-image-060.png)

Test agent receiving campaign calls .

perform a test in Agent desktop to validate that you receive the campaign call of the “Standard Preview Campaign”  
  
![](assets/docx-image-061.png)

And once you click answer the campaign call the next contact will be delivered to you to **accept**, **skip** or **remove** based on the options selected in the campaign

Once you click accept an outbound call will be placed.

![](assets/docx-image-062.png)

**Congratulations**, you have performed the Standard Preview Campaign test.!!!
