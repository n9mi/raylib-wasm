# Raylib WebAssembly Example 
## Setup
### Install Raylib 
This is the easiest way to setup Raylib in Linux according to the [wiki](https://github.com/raysan5/raylib/wiki/Working-on-GNU-Linux).
```bash
# for ubuntu-based distros
sudo apt install libasound2-dev libx11-dev libxrandr-dev libxi-dev libgl1-mesa-dev libglu1-mesa-dev libxcursor-dev libxinerama-dev libwayland-dev libxkbcommon-dev

# using cmake
sudo apt install cmake

# On ~/ directory
git clone https://github.com/raysan5/raylib.git raylib

cd raylib

mkdir build && cd build

cmake -DBUILD_SHARED_LIBS=ON ..

make

sudo make install

sudo ldconfig
```
For testing purpose, you may build this `main.cpp` file with
```bash
g++ main.cpp -o ball -lraylib
```
And run the program with 
```bash
./ball
```

### Install Emscripten
This how to install Emscripten in Linux. 

```bash
# On ~/ directory
git clone https://github.com/emscripten-core/emsdk.git

cd emsdk

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes .emscripten file)
./emsdk activate latest

# Activate PATH and other environment variables in the current terminal. Please copy the output somewhere else, we'll use it later.
source ./emsdk_env.sh
```

Don't forget to update the PATH by add this few lines to `.bashrc`
```bash
export PATH=$PATH:~/emsdk
export PATH=$PATH:~/emsdk/upstream/emscripten
```
and apply the changes
```bash
source ~/.bashrc
```
Check if Emscripten successfully installed, by opening a new terminal session an type
```
emcc -v
```
will outputting emcc version and installation directory. 

### Compile Raylib with Emscripten
Navigate your terminal to your `src` Raylib installation folder, for example `~/raylib/src` and change these few lines on `Makefile` 
```bash
# PLATFORM             ?= PLATFORM_DESKTOP
PLATFORM             ?= PLATFORM_WEB

# RAYLIB_RELEASE_PATH  ?= $(RAYLIB_SRC_PATH)
RAYLIB_RELEASE_PATH  ?= $(RAYLIB_SRC_PATH)/web
```
Configure these path to match your previous Emscripten installation setup 
- `EMSDK_PATH` as `/home/$USER/emsdk` (replace $USER with your username)
- `NODE_PATH`
Compile Raylib with Emscripten
```bash
make PLATFORM=PLATFORM_WEB -B
```
This will generate `libraylib.web.a` file to your `~/raylib/src/web` directory.

## Compile your Raylib `.cpp` file into `.wasm`
Navigate to your game `main.cpp` file and run this 
```bash
emcc -o ball.html main.cpp -Os -Wall -std=c++11 \
    /home/$USER/raylib/src/web/libraylib.web.a \
    -I. -I /home/$USER/raylib/src \
    -L. -L /home/$USER/raylib/src \
    -s USE_GLFW=3 \
    -s ASYNCIFY \
    --shell-file /home/$USER/raylib/src/shell.html \
    -DPLATFORM_WEB
```
You can add these parameters according to needs.
```bash
  --preload-file resources      # Specify a resources directory for data compilation (it will generate a .data file)
  -s TOTAL_MEMORY=67108864      # Specify a heap memory size in bytes (default = 16MB) (67108864 = 64MB)
  -s ALLOW_MEMORY_GROWTH=1      # Allow automatic heap memory resizing -> NOT RECOMMENDED!
  -s FORCE_FILESYSTEM=1         # Force filesystem creation to load/save files data (for example if you need to support save-game or drag&drop files)
  -s ASSERTIONS=1               # Enable runtime checks for common memory allocation errors (-O1 and above turn it off)
  --profiling                   # Include information for code profiling
```
This will outputting `ball.html`, `ball.js`, and `ball.wasm`. You can try to run it from your browser by using python http server 
```bash
python -m http.server 8000
# or
python -m http.server 8000 --bind {another ip address}
```

## Additional notes
You can also modify and style your `.html` according to needs. This `example/ball.html` will specify the formatted html and some basic styling. You can also run the `example/ball.html` with python http server.