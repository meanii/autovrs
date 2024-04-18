# AutoVRs demo

AutoVRs demo - render and edit 3D models file using blender api

# Content of the README
- [Component](#component)
- [Installation](#installation)
- [Usage](#usage)

## Component
- `cli.py` - blender script to render and edit 3D models file using blender api via command line, which is use ny autovrs backend service
- `autovrs-engine` - autovrs backend service, which is use blender to render and edit 3D models file, and provide api for frontend service and also storage service to store the 3D models file
- `autovrs-frontend` - autovrs frontend service, which is use to provide user interface to render and edit 3D models file

## Installation
### pre-requisite
- `python3.11` - install python3 from [python official website](https://www.python.org/downloads/)
- `blender` - install blender from [blender official website](https://www.blender.org/download/)
- `bpy` - install bpy from [bpy official website](https://developer.blender.org/docs/handbook/building_blender/python_module/)
- `docker` - install docker from [docker official website](https://docs.docker.com/get-docker/)
- `docker-compose` - install docker-compose from [docker-compose official website](https://docs.docker.com/compose/install/)

`blender` and `bpy` is required to run the `cli.py` script
in order to install `bpy`, you have to compile the `bpy` module from blender source code, you can follow the instruction from [bpy official website](https://developer.blender.org/docs/handbook/building_blender/python_module/)

### install autovrs-engine
```bash
git clone git@github.com:meanii/autovrs.git && cd autovrs
docker-compose up -d
```

### what docker-compose do
- create a docker network `autovrs`
- create a docker volume `mongodb-data`
- create a docker volume `autovrs-engine-data`
- create mongodb container `mongodb` and attach to `autovrs` network
- frontend service expose at `http://localhost:3000`
- backend service expose at `http://localhost:4000`

#### you can add nginx to proxy the request to the frontend and backend service

### usage
- open `https://demo.meanii.dev` in your browser
- upload a 3D models file
- click on the 3D models file to render and edit the 3D models file
- click on the download button to download the 3D models file
- click on the view button to view the 3D models file