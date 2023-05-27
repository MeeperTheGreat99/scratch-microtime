class MicroTime {
	constructor(runtime) {
		this.runtime = runtime;
	}
	
	getInfo() {
        return {
            "id": "MicroTime",
            "name": "MicroTime",
            "blocks": [
			{
				"opcode": "getMicrosecs",
				"blockType": "reporter",
				"text": "get seconds since start (microsec precision)",
				
			}
			]
        }
    }
	
	getMicrosecs() {
		return performance.now() * 0.001;
	}
}

(function() {
    var extensionClass = MicroTime
    if (typeof window === "undefined" || !window.vm) {
        Scratch.extensions.register(new extensionClass())
    }
    else {
        var extensionInstance = new extensionClass(window.vm.extensionManager.runtime)
        var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
        window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
    }
})()