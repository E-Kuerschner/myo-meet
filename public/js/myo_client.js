module.exports = MyoClient();

function MyoClient() {

	Myo.connect();

	lockingPolicy = "none";
	setTimeout(function(){Myo.setLockingPolicy("none")}, 1000);

	Myo.on('connected', function(){
		console.log(this.macAddress + " connected");
		this.unlock(true);
	});

	Myo.on('unlocked', function(){
		console.log(this.name + " is now unlocked.");
	});

	Myo.on('locked', function(){
		console.log(this.name + " is now locked");
	});

	Myo.on('pose', function(name){
		var pose_box = document.getElementById('pose');
		pose_box.innerHTML = name;
		if(name == "fist"){
			this.zeroOrientation();
		}
		if(name == "wave_out"){
			if(lockingPolicy == "none"){
				console.log("changing policy to standard.");
				Myo.setLockingPolicy("standard");
				lockingPolicy = "standard";
			}
			else{
				console.log("changing policy to none");
				Myo.setLockingPolicy("none");
				this.unlock(true);
			}	
		}
		//console.log(this);
		//socket.emit('pose', {name: name});
		//socket.emit('device_status', {device: this});
	});

	Myo.on('orientation', function(data){
		var roll = Math.atan2(2.0 * (data.w * data.x + data.y * data.z), 1.0 - 2.0 * (data.x * data.x + data.y * data.y)) ;
		var pitch = Math.asin(Math.max(-1.0, Math.min(1.0, 2.0 * (data.w * data.y - data.z * data.x))));
		var yaw = Math.atan2(2.0 * (data.w * data.z + data.x * data.y), 1.0 - 2.0 * (data.y * data.y + data.z * data.z));

		$("#xval").val(roll);
		$("#yval").val(pitch);
		$("#zval").val(yaw);
	});

	Myo.onError = function(){
		console.log('Couldn\'t connect to the Myo! Check your connections!');
	};

	//custom locking policy for any myo connected
	//normally, starting the game will trigger the unlock but this manual lock policy will be added for dev purposes
	Myo.on('double_tap', function(edge){
		if(edge)
		{
			if(!this.isLocked)
			{
				console.log("locking " + this.id);
				this.lock();
			}
			else
			{
				console.log("unlocking " + this.id);
				this.unlock();
			}
		}
	});
}