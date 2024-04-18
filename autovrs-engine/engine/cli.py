import bpy
import argparse
import sys
import logging
from pathlib import Path


parser = argparse.ArgumentParser(
    prog='autovrs-engine',
    description='autovrs-engine is a command line tool to handle 3D objects',
    epilog='Enjoy the program! :)',
    add_help=True
)

parser.add_argument( '-i', '--input', required=True, help='Input file path')
parser.add_argument('-o', '--output', required=True, help='Output file path')

parser.add_argument('-v', '--verbose', action='store_true', help='Enable verbose mode') # Enable verbose mode

parser.add_argument('-s', '--scale', type=float, default=None, help='Scale the object') # Scale the object
parser.add_argument('--position', nargs=3, type=float, default=None, help='Change position of the object.') # Change position of the object
parser.add_argument('-l', '--levels', type=int, default=None, help='Subdivide the object') # Subdivide the object

args = parser.parse_args(args=sys.argv[5:])

# Enable verbose mode
if args.verbose:
    logging.basicConfig(level=logging.DEBUG)


# Validate the input and output
if args.input.split('.')[-1] not in ['fbx', 'obj', 'usdz', 'glb']:
    raise ValueError('Invalid input format, only fbx, obj, usdz, glb are supported')

if args.output.split('.')[-1] not in ['fbx', 'obj', 'usdz', 'glb']:
    raise ValueError('Invalid output format, only fbx, obj, usdz, glb are supported')

# Validate the position
if args.position:
    if len(args.position) != 3:
        raise ValueError('Position should have 3 values')

# Validate the scale
if args.scale:
    if args.scale <= 0:
        raise ValueError('Scale should be greater than 0')

# Validate the levels
if args.levels:
    if args.levels <= 0:
        raise ValueError('Levels should be greater than 0')

# Print the input and output
logging.debug('Input: %s', args.input)
logging.debug('Output: %s', args.output)


class Blender:
    """
    Blender class to handle 3D objects
    """
    def __init__(self, path: str):
        """
        Initialize the object
        """
        self.path = path
        bpy.ops.import_scene.fbx(filepath=self.path)

        # Select the imported object
        self.obj = bpy.context.selected_objects[0]
    
    def change_scale(self, scale: float):
        """
        Change Scale of the object
        """
        self.obj.scale = (scale, scale, scale)
    
    def change_location(self, x: float, y: float, z: float):
        """
        Change Position in 3D space
        """
        self.obj.location = (x, y, z)  # Move object 2 units along the z-axis
    
    def subdivide(self, levels: int):
        """
        Subdivide the object
        """
        if self.obj.type == 'MESH':
            bpy.ops.object.mode_set(mode='EDIT')
            bpy.ops.mesh.select_all(action='SELECT')
            bpy.ops.mesh.subdivide(number_cuts=levels) # Subdivide the object
            bpy.ops.object.mode_set(mode='OBJECT')
    
    def export(self, path: str):
        """
        Export the object
        """
        # make sure the path is exists, if not create the path
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        
        output_fe = path.split('.')[-1] # Get the output format
        if output_fe == 'fbx':
            bpy.ops.export_scene.fbx(filepath=path, use_selection=True)
        elif output_fe == 'obj':
            bpy.ops.export_scene.obj(filepath=path, use_selection=True)
        elif output_fe == 'usdz':
            bpy.ops.export_scene.usdz(filepath=path, use_selection=True)
        elif output_fe == 'glb':
            bpy.ops.export_scene.gltf(filepath=path, use_selection=True)
        else:
            raise ValueError('Invalid output format')



# Initialize the Blender class
blender = Blender(path=args.input)

# Change Scale
if args.scale:
    blender.change_scale(scale=args.scale)

# Change Position
if args.position:
    blender.change_location(x=args.position[0], y=args.position[1], z=args.position[2])

# Subdivide the object
if args.levels:
    blender.subdivide(levels=args.levels)

# Export the object
blender.export(path=args.output)