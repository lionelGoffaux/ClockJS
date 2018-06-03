# ClockJS

A js clock

##setup

First create a canvas tag and add clock.js

```html
<script src="clock.js" async></script>
```

```html
<body>
    <canvas id="clock" width="100" height="100"></canvas>
</body>
```

Then instantiate a new clock with the canvas element as parameter

```javascript
new Clock (document.querySelector("#clock")
```
The constructor can also take some options

```javascript
new Clock (document.querySelector("#clock"),{
    style: "modern",
    hoursThickness: 40,
    minutesThickness: 40,
    secondsThickness: 40
})
```

### Options list

* **radiusOption** : radius in percent of page
* **style** : classic or modern (default classic)
* **hoursSize** : distance between the end of the hand and the center of the clock
* **minutesSize** : distance between the end of the hand and the center of the clock
* **secondsSize** : distance between the end of the hand and the center of the clock
* **hoursThickness** : hours hand's thickness
* **minutesThickness** : minutes hand's thickness
* **secondsThickness** : seconds hand's thickness
* **hoursColor** : hand's color
* **minutesColor** : hand's color
* **secondsColor** : hand's color
* **bgColor** : background's color
