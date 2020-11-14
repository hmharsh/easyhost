spin up MongoDB container
 docker volume create mongodbdata
 docker run -p 27017:27017 -v mongodbdata:/data/db mongo

login feature
 https://stackoverflow.com/questions/12276046/nodejs-express-how-to-secure-a-url
 https://github.com/narenaryan/node-jwt-integ // for JWT
 

 To do
 - Add homevisitor id with link/fileupload request
 
 - Use optional password in file sharing
 - Limit number of link generation per host per n hours

 - add two extra one digit numbers at the end of timestamp for uid (at all 3 places of uid generation)
 - history clean up a constant diferent for both hosted item and script tag
 - backend code sanity

UI
- Explore entire UI and clean the existing code
- Copy to clipboard option in link
- Look at both commomscript closely and see if they both can be merged
- performance improvement options

** decisions
- Remove track own website or add recaptcha (recaptcha can be added in both file upload and link generation)
- Encrypted storage
- Notification for this website use cookies for better user experience (user should not allowed to use website untill acceptance)
- 

http://localhost:3000/homevisits.html#1605551916557
