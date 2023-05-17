# Get in touch and configure GSM modem
the Modem will have a SIM card so it can be operated as mobile operator ( sending and receive SMS message ) and be connected to a PC that installed Kannel. 

# 1. What I have done ?
- Get some knowledge background about Kannel structure and configuration
- Getting familiar with nodejs and postgreSQL

# 2.Finalize some of requirement
how do user register to get reminder
1. Via SMS message, having a predefined SMS syntax that enable the register function.
(+) fast
(-) need extra steps to configure in GSM modem, no security ( If rely on on the GSM modem filter, can only get the phone number at most as )
2. Simple website for register this service 
(+) can get full credential or necessary information to identify user 
(-) does it make sense ? 
3. What is the option that we are giving to user ? This would affect a lot to how we build scheduler to send reminder to user
- Register for a fixed time slot ( or hard code the reminder time ): not realistic when each user can have different life schedule
- Register for custom time : this is the ideal case but (-) need implement on a scheduler/cron-job that will check for each time slot ( one hour per time ) and sending reminder
4. How many reminder(s) can a user get for a day ? 

# 3. Creating usecase : How many scenario would happen for this app ? 

1. user register for reminder
2. server response with register success or failed
3. the server sending reminder for user
4. user response with their glucose measurement
5. server response based on patient's glucose measurement
