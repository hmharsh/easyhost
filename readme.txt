spin up MongoDB container
 docker volume create mongodbdata
 docker run -p 27017:27017 -v mongodbdata:/data/db mongo

login feature
 https://stackoverflow.com/questions/12276046/nodejs-express-how-to-secure-a-url
 https://github.com/narenaryan/node-jwt-integ // for JWT
 

 To do 
 - limit number of link generation per host per n hours 
 - history clean up a constant diferent for both hosted item and script tag
 - enhance logging (with right logging package)
 - backend code sanity

UI
- correct links (href) rg dashboard links from UI (admin pages)
- explore entire UI and clean the existing code
- copy to clipboard option in link
- look at both commomscript closely and see if they both can be merged
- performance improvement options
- try accessing same webpage from different browsers and take look at warnings

** decisions
- remove track own website or add recaptcha (recaptcha can be added in both file upload and link generation)
- encrypted storage
- notification for this website use cookies for better user experience (user should not allowed to use website untill acceptance)
- generate ISP information as when needed (on just fetch ISP name for the moment) (using whois-json npm module's last resukt in array), for inout to whois get public IP  https://stackoverflow.com/questions/58438780/how-to-get-public-ip-address-of-client-sending-the-request-using-nodejs-express (also find some way to confirm it's public and ipv4)



** DevOps
- continerisation 
- mongodb statefulset
- mongodb db and colletion init script
- k8s manifest
- helm chart with config values
- development pipelne from git push to master (should upload the newer image), build pass, fail tag on github
- proper readme