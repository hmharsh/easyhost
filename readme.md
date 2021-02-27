spin up MongoDB container
 ```
 docker volume create mongodbdata
 docker run -p 27017:27017 -v mongodbdata:/data/db mongo
 ```

 
# EasyHost
Listing below the enhancements planned from various aspects
## UserInfo detection enhancements
 - Audio support (email + https://stackoverflow.com/a/31647707/3386952)
 - Video support
 - Localstorage support
 - ISP information
 - Battary information (https://www.webondevices.com/9-javascript-apis-accessing-device-sensors/)
 - Installed plugin information (https://www.tutorialspoint.com/How-to-list-down-all-the-plug-in-installed-in-your-browser)
 - Ad-blocker info (https://stackoverflow.com/a/65532927/3386952)
 - navigator.deviceMemory
 - Mobile senser related info POC
 - Enhance proxy detection
 


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
