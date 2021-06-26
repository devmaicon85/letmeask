export default function serviceworker() {
  let swUrl = `/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.log("response done:-", response);
  });

  /*     if('serviceWorker' in navigator){
        window.addEventListener('load',function(){
            navigator.serviceWorker.register(swUrl)
            .then(function(registration){
                console.log("worker registration is successfull",registration.scope);
            },function(err){
                console.log("Failed")
            })
            .catch(function(err){
                console.log(err)
            })
        })
    }else{
        console.log("Service worker is not supported")
    } */
}
