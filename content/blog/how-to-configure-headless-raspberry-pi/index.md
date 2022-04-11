---
title: "Get yourself a headless Raspberry Pi with Node.js"
date: "2016-01-26T11:07:08.000Z"
description: "Get yourself a headless Raspberry Pi with Node.js"
publication_status: published
---

_This small article is meant to be an easy, step by step guide to installing a headless Raspberry Pi with Node.js_.

What's covered:

- Install Raspbian Lite
- Find your Pi
- Go wireless
- Upgrade and get some goodies
- Node time

Let's do it!

## 1\. Install Raspbian Lite

[Raspbian lite](https://www.raspberrypi.org/downloads/raspbian/) is a minimal version of Raspbian that doesn't contain the desktop environment (useless for a headless setup).

Download it on the [RaspberryPi website](https://www.raspberrypi.org/downloads/raspbian/) website and install it following [the instructions](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

## 2\. Find your Pi

After you have your Raspberry Pi turned on and connected to the Ethernet network, you need to find its IP address.  
To make this work, you'll need your router to have a **DHCP server enabled** and you also need to know the network your DHCP is releasing addresses to.

Suppose the network is 192.168.0.0/24, then run: `nmap -sn 192.168.0.0/24`

```shell
➜  ~  nmap -sn 192.168.0.0/24

Starting Nmap 6.46 ( http://nmap.org ) at 2016-01-16 16:01 GMT
Nmap scan report for Router.Home (192.168.0.1)
Host is up (0.045s latency).
Nmap scan report for air (192.168.0.4)
Host is up (0.023s latency).
Nmap scan report for raspy (192.168.0.19)
Host is up (0.040s latency).
Nmap done: 256 IP addresses (3 hosts up) scanned in 1.25 seconds
```

Now that you know where it lives (in this case 192.168.0.19), connect to it via SSH `ssh pi@192.168.0.19` password is _raspberry_.

## 3\. Go wireless

You're now ready to connect to a WiFi network and get rid of that annoying cable:

- **Find the network you want to connect to**

`sudo iwlist wlan0 scan`

You'll need the SSID and passkey to connect to the network.

- **Configure wpa_supplicant**

`sudo nano /etc/wpa_supplicant/wpa_supplicant.conf`

```shell
# /etc/wpa_supplicant/wpa_supplicant.conf

network={
    ssid="network_name"
    psk="network_passkey"
}
```

Save, disconnect the cable and restart the network: `sudo /etc/init.d/networking restart`

Now run the search again (point 2) and ssh to the new IP address.

## 4\. Upgrade and get some goodies

Just to make sure you're on the bleeding edge.

- **Update your system**

`sudo apt-get update && sudo apt-get upgrade`

- **Add some useful packages**

`sudo apt-get install vim git zsh`

- **Get a better shell ([Oh-my-zsh](http://ohmyz.sh/))**

`sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"`

## 5\. Node time

Time to get [Node.js](https://nodejs.org/en/)!

- **Get and unpack it**

```shell
wget https://nodejs.org/dist/v5.5.0/node-v5.5.0-linux-armv6l.tar.gz`
tar -xvf node-v5.5.0-linux-armv6l.tar.gz`
cd node-v5.5.0-linux-armv6l
```

**Note**:  
For _Raspberry Pi Model A, B, B+_ use the _node-vx.x.x-linux-armv6l_ version.

For _Raspberry Pi 2 Model B_ use the _node-vx.x.x-linux-armv7l_ version.

- **Remove non useful files**

`rm CHANGELOG.md LICENSE README.md`

- **Install it in `/usr/local`**

`sudo cp -R * /usr/local/`

That's it! You can now enjoy your headless, lightweight Rapberry Pi now!

_Sources:_

- [https://www.raspberrypi.org/documentation/installation/installing-images/README.md](https://www.raspberrypi.org/documentation/installation/installing-images/README.md)
- [https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)
- [http://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi/](http://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi/)
