class Clock {

    /**
     * @constructor
     * @param {HTMLElement} canvas 
     * @param {Object} options
     * @param {number} options.radiusOption radius in percent of page 
     * @param {string} options.style classic or modern (default classic)
     * @param {number} options.hoursSize distance between the end of the hand and the center of the clock
     * @param {number} options.minutesSize distance between the end of the hand and the center of the clock
     * @param {number} options.secondsSize distance between the end of the hand and the center of the clock
     * @param {number} options.hoursThickness hand's thickness
     * @param {number} options.minutesThickness hand's thickness
     * @param {number} options.secondsThickness hand's thickness
     * @param {string} options.hoursColor hand's color
     * @param {string} options.minutesColor hand's color
     * @param {string} options.secondsColor hand's color
     * @param {string} options.bgColor background's color
     */
    constructor(canvas, options = null){
        this.radiusOption = 35
        this.style = "classic"
        this.hoursSize = 60
        this.minutesSize = 80
        this.secondsSize = 100
        this.hoursThickness = 30
        this.minutesThickness = 17
        this.secondsThickness = 7
        this.hoursColor = "#8e44ad"
        this.minutesColor = "#27ae60"
        this.secondsColor = "#f1c40f"
        this.bgColor = "#2c3e50"
        this.parseOptions(options)
        this.canvas = canvas
        this.context = this.canvas.getContext("2d")
        this.resizeCanvas()
        window.addEventListener("resize", this.resizeCanvas.bind(this))
        this.update()
    }

    /**
     * Parse options from user
     * @param {object} options 
     * @param {number} options.radiusOption radius in percent of page 
     * @param {string} options.style classic or modern (default classic)
     * @param {number} options.hoursSize distance between the end of the hand and the center of the clock
     * @param {number} options.minutesSize distance between the end of the hand and the center of the clock
     * @param {number} options.secondsSize distance between the end of the hand and the center of the clock
     * @param {number} options.hoursThickness hand's thickness
     * @param {number} options.minutesThickness hand's thickness
     * @param {number} options.secondsThickness hand's thickness
     * @param {string} options.hoursColor hand's color
     * @param {string} options.minutesColor hand's color
     * @param {string} options.secondsColor hand's color
     * @param {string} options.bgColor background's color
     */
    parseOptions(options){
        if(options){
            if(options.radiusOption){
                this.radiusOption = options.radiusOption
            }

            switch (options.style) {
                case "classic":
                    this.style = options.style
                    break
                case "modern":
                    this.style = options.style
                    break
            }

            if(options.hoursSize){
                this.hoursSize = options.hoursSize
            }

            if(options.minutesSize){
                this.minutesSize = options.minutesSize
            }

            if(options.secondsSize){
                this.secondsSize = options.secondsSize
            }

            if(options.hoursThickness){
                this.hoursThickness = options.hoursThickness
            }

            if(options.minutesThickness){
                this.minutesThickness = options.minutesThickness
            }

            if(options.secondsThickness){
                this.secondsThickness = options.secondsThickness
            }

            if(options.hoursColor){
                this.hoursColor = options.hoursColor
            }

            if(options.minutesColor){
                this.minutesColor = options.minutesColor
            }

            if(options.secondsColor){
                this.secondsColor = options.secondsColor
            }

            if(options.bgColor){
                this.bgColor = options.bgColor
            }

        }

    }

    /**
     * Resize the canvas whenever necessary
     */
    resizeCanvas(){
        this.height = window.innerHeight
        this.width = window.innerWidth
        this.setClockRadius()
        this.canvas.setAttribute("height", this.height)
        this.canvas.setAttribute("width", this.width)
    }

    /**
     * Fixes teh clock's radius
     */
    setClockRadius(){
        if(this.height < this.width){
            this.clockRadius = this.height * (this.radiusOption/100)
        }
        else{
            this.clockRadius = this.width * (this.radiusOption/100)
        }
    }

    /**
     * Redraw each frame
     */
    update(){

        //pick the current time
        this.time = new Date(Date.now())

        //redraw the background
        this.context.clearRect(0, 0, this.width, this.height)
        this.context.fillStyle = this.bgColor
        this.context.fillRect(0, 0, this.width, this.height)

        //redraw the hands
        this.drawSeconds(this.time.getSeconds())
        this.drawMinutes(this.time.getMinutes())
        this.drawHours(this.time.getHours())

        //callback the same function for the next frame
        window.requestAnimationFrame(this.update.bind(this))
    }

    /**
     * Draw the hours' hand
     * @param {number} hours 
     */
    drawHours(hours){
        hours %=12 //to have a 12 hours clock

        if(this.style == "classic"){
            let handEnd = this.getHandEnd(hours * ((2*Math.PI)/12), this.hoursSize)
            this.drawHand(handEnd, this.hoursColor, this.hoursThickness)

            //draw the center of the classic clock
            this.context.fillStyle = this.hoursColor
            this.context.beginPath()
            this.context.arc(this.width/2, this.height/2, (this.hoursThickness/(1000*(this.radiusOption/100)))*this.clockRadius/1.5, 0, 2*Math.PI)
            this.context.fill()
        }
        else if(this.style == "modern"){
            this.drawModernHand(this.hoursColor, this.hoursThickness, this.hoursSize, (hours * ((2*Math.PI)/12))+(3*Math.PI)/2)
        }
    }

    /**
     * Draw the minutes' hand
     * @param {number} minutes 
     */
    drawMinutes(minutes){
        if(this.style == "classic"){
            let handEnd = this.getHandEnd(minutes * ((2*Math.PI)/60), this.minutesSize)
            this.drawHand(handEnd, this.minutesColor, this.minutesThickness)
        }
        else if(this.style == "modern"){
            this.drawModernHand(this.minutesColor, this.minutesThickness, this.minutesSize, (minutes * ((2*Math.PI)/60))+(3*Math.PI)/2)
        }
    }

    /**
     * Draw the seconds' hand
     * @param {number} seconds 
     */
    drawSeconds(seconds){
        if(this.style == "classic"){
            let handEnd = this.getHandEnd(seconds * ((2*Math.PI)/60), this.secondsSize)
            this.drawHand(handEnd, this.secondsColor, this.secondsThickness)
        }
        else if(this.style == "modern"){
            this.drawModernHand(this.secondsColor, this.secondsThickness, this.secondsSize, (seconds * ((2*Math.PI)/60))+(3*Math.PI)/2) //find the good radian angle
        }
    }

    /**
     * Find the coordinates of the hand's end using Pythagore
     * @param {number} angle radian angle
     * @param {number} size distance between the end of the hand and the center of the clock
     * @returns {Object} handEnd
     * @returns {number} handEnd.x
     * @returns {number} handEnd.y
     */
    getHandEnd(angle, size){
        let y = (Math.sin((Math.PI/2) - angle) * ((size/100)*this.clockRadius)) * -1 //-1 because the canvas' y axis is reverse
        y = this.height/2 + y  // add to the center's coordinates
        let x = Math.cos((Math.PI/2) - angle) * ((size/100)*this.clockRadius)
        x = this.width/2 + x
    
        return {
            x: x,
            y: y
        }
    }


    /**
     * Draw a hand
     * @param {Object} handEnd 
     * @param {string} color 
     * @param {number} thickness 
     */
    drawHand(handEnd, color, thickness){

        this.context.strokeStyle = color
        this.context.lineWidth = (thickness/(1000*(this.radiusOption/100)))*this.clockRadius
        this.context.beginPath()
        this.context.moveTo(this.width/2, this.height/2)
        this.context.lineTo(handEnd.x, handEnd.y)
        this.context.closePath()
        this.context.stroke()

    }

    /**
     * Draw a modern hand
     * @param {String} color 
     * @param {number} thickness 
     * @param {number} size distance between the end of the hand and the center of the clock
     * @param {number} angle 
     */
    drawModernHand(color, thickness, size, angle){

        this.context.strokeStyle = color
        this.context.lineWidth = (thickness/(1000*(this.radiusOption/100)))*this.clockRadius
        this.context.beginPath()
        this.context.arc(this.width/2, this.height/2, (size/100)*this.clockRadius, (3*Math.PI)/2, angle) //to start at 90 degrees 
        this.context.stroke()
    }

}

//set the clock
new Clock (document.querySelector("#clock"),{
    style: "modern",
    hoursThickness: 40,
    minutesThickness: 40,
    secondsThickness: 40
})
