# README for this test Docker image #

This is a sample Docker image to setup an SSH server; 
and then, to connect to it; base image is Ubuntu Linux.

For simplicity:
- in the image the root user is used, and it has been enable to ssh into it
- a trivial password has been set for it but it won't be used here
- I enable login with the key of the current (host) user, 
  by copying related public key into the container


## Commands sequence

```
make -f docker/Makefile.sshserver build
make -f docker/Makefile.sshserver start
make -f docker/Makefile.sshserver copy-key
```
or (same sequence, handled by make):
```
make -f docker/Makefile.sshserver build-and-setup
```

For interactive testing:
```
make -f docker/Makefile.sshserver inspect
```
for ssh connection (interactiv, then leave it with 'exit'):
```
make -f docker/Makefile.sshserver ssh-connect-and-list-files
```

For non-interactive testing (ssh login with my public key), 
to let ssh connection run some commands and return its output:
```
make -f docker/Makefile.sshserver ssh-connect-and-list-files
```

At the end, remove all:
```
make -f docker/Makefile.sshserver clean-all
```


## Requirements

Latest: Git, Make (cmake), Docker; all running on a Linux or a Mac.


## Note

This is *NOT* the recommended way to connect to a running container, 
but it's needed here only to test SSH connections from the library (`ssh-exec`), 
to ensure that it works.

After tests, container and image are destroyed, so no data leak.

Both Dockerfile and Makefile hasn't the default (no) extension.
To do some experiments with other Linux base images a suggested approach is to 
add to both Dockerfile and Makefile an extension 
(like '.ubuntu' or '.alpine' for example), 
but then to use you'll need to specify those files in any command, like:
```
make -f docker/Makefile.ubuntu build
```
and in the 'Makefile.ubuntu', refer to the 'Dockerfile.ubuntu', as:
```
	docker build -t ${DOCKER_TAG} -f docker/Dockerfile.ubuntu .
```


## License

MIT

----
