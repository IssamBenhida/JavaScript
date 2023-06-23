var closed_port_max = 2000;
ip = [192,168,100,4];
port = 8000 ;
  
function stopfor(ms){
  return new Promise( resolve => {
    setTimeout(()=> {resolve("")},ms);
  }) 
}

function scan_network_ws() {
	start_time = (new Date).getTime();
	try {
  	  ws = new WebSocket("ws://" + ip.join(".") + ":" + port);
    	setTimeout("check_ns_ws()", 100);
	} catch (err) {
    	return;
	}
}

function check_ns_ws() {
    var interval = (new Date).getTime() - start_time;
    if (ws.readyState == 0) {
        if (interval > closed_port_max) {
            console.log(port + "%c :Port is down.",'color:red');
        } else {
            setTimeout("check_ns_ws()", 100);
        }
    } else {
        console.log(port + "%c :Port is Up.",'color:green');
        new Image().src = "http://192.168.100.5:8000/?ip_IsUp=" + ip.join(".");
    };
}


async function go(){
  for(let i=8000; i<8001; i++){
    scan_network_ws();
    await stopfor(2100);
    port = i;
  }
}

go();