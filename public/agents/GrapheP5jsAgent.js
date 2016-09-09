  /**
   * Custom agent prototype
   * @param {String} id
   * @constructor
   * @extend eve.Agent
   */
  function GrapheP5jsAgent(id) {
    // execute super constructor
    eve.Agent.call(this, id);

    // connect to all transports configured by the system
    this.connect(eve.system.transports.getAll());
  }

  // extend the eve.Agent prototype
  GrapheP5jsAgent.prototype = Object.create(eve.Agent.prototype);
  GrapheP5jsAgent.prototype.constructor = GrapheP5jsAgent;

  /**
   * Send a greeting to an agent
   * @param {String} to
   */
  GrapheP5jsAgent.prototype.sayHello = function(to) {
    this.send(to, 'Hello ' + to + '!');
	};

  /**
   * Handle incoming greetings. This overloads the default receive,
   * so we can't use GrapheP5jsAgent.on(pattern, listener) anymore
   * @param {String} from     Id of the sender
   * @param {*} message       Received message, a JSON object (often a string)
   */
  GrapheP5jsAgent.prototype.receive = function(from, message) {
    console.log(from + ' said: ' + JSON.stringify(message) + '<br>');

    if (message.indexOf('Hello') === 0) {
      // reply to the greeting
      this.send(from, 'Hi ' + from + ', nice to meet you!');
    }
    

  };
