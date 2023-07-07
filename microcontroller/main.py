import machine
import time
import network
import esp
import gc
import urequests as requests
import json
import uasyncio as asyncio

esp.osdebug(None)
gc.collect()

ssid = "sarojshrestha_2.4"
password = "CLEB263F00Naruto"
url = "http://192.168.10.69:8080/pulses"
shared_currentCount = 0

def blink(led_pin):
    led_pin.on()
    time.sleep(0.25)
    led_pin.off()
    time.sleep(0.25)
    led_pin.on()

def debounce(pin):
    time.sleep(0.25)
    state = pin.value()
    time.sleep(0.25)
    if pin.value() != state:
        return None
    return state


pulse_pin = machine.Pin(15, machine.Pin.IN, machine.Pin.PULL_UP)
led_pin = machine.Pin(22, machine.Pin.OUT)
station = network.WLAN(network.STA_IF)

station.active(True)
station.connect(ssid, password)

while not station.isconnected():
    pass

print('Connection successful')
print(station.ifconfig())
blink(led_pin)

async def scan_pulse():
    global shared_currentCount
    while True:
        state = debounce(pulse_pin)

        if state is not None and state == 0:
            shared_currentCount += 1
            print("CurrentCount:", shared_currentCount)
        await asyncio.sleep(0.01)
        
async def send_pulse():
    global shared_currentCount
    while True:
        await asyncio.sleep(60)
        if shared_currentCount != 0:
            print("send_pulse")
            payload = json.dumps({
                "pulseCount": shared_currentCount,
                "meterId": "cljs051hq00026wxb2ivrixw3"
            })
            headers = {
                'Content-Type': 'application/json'
            }
            response = requests.post(url, headers=headers, data=payload) 
            print("Response status:", response.status_code)
            shared_currentCount = 0;
        
        

# Run the event loop
loop = asyncio.get_event_loop()
loop.create_task(scan_pulse())
loop.create_task(send_pulse())
loop.run_forever()
    