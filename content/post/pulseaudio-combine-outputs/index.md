---
title: "PulseAudio — Combining Two or More Output Devices"
date: 2022-01-25T17:40:34+01:00
author: "Christer Jensen"
description: How to combine two pulse audio outputs into a single virtual output.
image: pexels-dmitry-demidov-3784424.jpg
draft: false
categories:
    - PulseAudio
    - Linux
    - Arch Linux
---

About how I combined the speakers in my two monitors into a single virtual
audio device that can be used to play back audio.

## Debugging PulseAudio

Before doing anything it can be useful to run PulseAudio in a terminal in order
to get its output and/or possible error messages. First stop any existing
PulseAudio daemon, example for systemd, and start locally.

```bash
# Remove '--user' if running system wide.
$ systemctl --user stop pulseaudio
$ pulseaudio -v
```


## Configure PulseAudio

Open the file `/etc/pulse/default.pa` if it does not contain the following line
add it at the end. This allows you to keep configurations in separate files
rather than having to modify `default.pa`.

```ini
# /etc/pulse/default.pa
.include /etc/pulse/default.pa.d
```

Create the directory `default.pa.d` if it doesn't already exist. Inside create
a file with the following content.

```bash
# Creates an sink (output) for each of the monitors.
load-module module-alsa-sink device="hw:1,1" sink_name="vsink_left_monitor" sink_properties="device.description='Left 4K Monitor'"
load-module module-alsa-sink device="hw:1,3" sink_name="vsink_right_monitor" sink_properties="device.description='Right 4K Monitor'"

# Creates a virtual sink that combines the two monitor outputs into a single output device.
load-module module-combine-sink sink_name="vsink_dual_monitor" sink_properties="device.description='Dual 4K Monitors Stereo'" slaves=vsink_left_monitor,vsink_right_monitor channels=2 channel_map=left,right
```

In my case each monitor did not show up as a separate sink (output), only the
one currently set as active profile on the card.[^1] To get this to work I first
turned off the card (using pulsemixer in my case), then following this helpful
answer on StackExchange[^2] I create new sinks for each device I wanted to
combine together using the alsa sink module. `hw:1,3` needs to be customised per
setup. The first number is the card ID, the second is the device ID alsa use.
These numbers can be gotten using `aplay -l` or `pacmd list-sinks`.

The second part uses the combine sink module to combine the sinks together to
a new virtual sink.

> If using PulseAudio system wide then use `system.pa` instead of `default.pa`.


### Stereo output

When playing something on the new combined output there should appear a
«Simultaneous output…» on either monitor's output. In Pulsemixer, by hitting
space, it is possible to adjust the volume of either channel separately. On the
left monitor reduce the right channel's volume to zero, and the opposite on the
right monitor. 

Now the left channel should only come from the left monitor and right channel
from the right.

![Pulsemixer setup with stereo](pulsemixer-stereo-example.png)


## Other useful links

 - [PulseAudio modules](https://www.freedesktop.org/wiki/Software/PulseAudio/Documentation/User/Modules/)
 - [Arch Wiki — PulseAudio](https://wiki.archlinux.org/title/PulseAudio)
 - [Arch Wiki — PulseAudio/Examples](https://wiki.archlinux.org/title/PulseAudio/Examples)


*Thumbnail by Dmitry Demidov from Pexels*

[^1]: [Useful info on how PulseAudio works.](https://gavv.github.io/articles/pulseaudio-under-the-hood/)
[^2]: [StackExchange answer](https://askubuntu.com/a/1213557/500885)
