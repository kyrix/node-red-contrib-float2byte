module.exports = function (RED) {
  function FloatConversionNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    node.on('input', function (msg) {
      var data = msg.payload
      var error = false

      // data的类型必须为string或者是浮点数。
      if (typeof data === 'number') {
        let data = new Uint8Array(new Float32Array([data]).buffer)
      } else if (typeof data === 'string') {
        let number = parseFloat(data)
        let data = new Uint8Array(new Float32Array([number]).buffer)
      } else {
        node.error(
          'msg.payload must be a float or string that can be converted to float'
        )
        error = true
      }

      if (!error) {
        msg.payload = data
        node.send(msg)
      }
    })
  }
  RED.nodes.registerType('floatToByte', FloatConversionNode)
}
