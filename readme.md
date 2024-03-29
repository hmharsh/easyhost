# EasyHost
 Easy host is a project where user can upload files that he/she wants to share and track 
 
 For example one class teacher can upload assignment on this portal and get a sharable link 
 
 Advantage of sharing file (assignment) with this way is, class teacher will get additional dashboard link to check 
 - Who access this file
 - File is accessed on phone or tablet or laptop
 - Internet and location information

These are just 3 important parameter form perpactive of a class teacher, but this solution is capable to detect around 70+ parameters about the user who browse the link to download the file (without any permission from the user who is browsing, hance it converted to a research project later: https://www.researchgate.net/publication/331866758_Security_Modeling_of_Parametric_Capturing_Tool_PCT_in_Analytical_layer_Service_for_e-Learning_Resources)




Listing below the enhancements planned from various aspects
## UserInfo detection enhancements
 - Audio support (email + https://stackoverflow.com/a/31647707/3386952)
 - Video support
   - Installed plugin information (https://www.tutorialspoint.com/How-to-list-down-all-the-plug-in-installed-in-your-browser)
 - Ad-blocker info (https://stackoverflow.com/a/65532927/3386952)
   - Battary and other (https://www.webondevices.com/9-javascript-apis-accessing-device-sensors/)
- navigator.deviceMemory
  - Pixel density / Screen Ratio
- Touchscreen capabilities
- Enhance proxy detection
- ISP information
- all resource detection along with their loading time: https://stackoverflow.com/questions/20621084/how-to-get-list-of-network-requests-done-by-html



spin up MongoDB container
 ```
 docker volume create mongodbdata
 docker run -p 27017:27017 -v mongodbdata:/data/db mongo
 ```
 


## UI
- Enhance index.html
- Updte newly added /deleted options in userinfo as listed above in UI tables (eg homevisits.html)
- Password checkbox status after reload index.html
- Correct links (href) rg dashboard links from UI (admin pages)
- Explore entire UI and clean the existing code
- Copy to clipboard option in link
- Look at both commomscript closely and see if they both can be merged
- Performance improvement options
- Try accessing same webpage from different browsers and take look at warnings


## Backend
- Remove track own website or add recaptcha (recaptcha can be added in both file upload and link generation)
- Encrypted, dedicated storage
- Limit number of link generation per host per n hours (by Uploads and issue creadentials check full useragent along with public ip match in aggregate function)
- History clean up a constant diferent for both hosted item and script tag

## Testing
- Write testcases to test the functionality using npm test 
- Intregration of tool like circleci or travice to perform testcase checks on PR, develop and release


## DevOps
- Continerisation 
- Mongodb statefulset
- Mongodb db and colletion init script
- K8s manifest
- Helm chart with config values
- Development pipelne from git push to master (should upload the newer image), build pass, fail tag on github
- Proper readme

### Auto deploy on github master branch change enabled using heroku pipeline 
