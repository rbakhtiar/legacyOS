CC = gcc
CXX = g++
AS = gcc
LD = ld

CFLAGS = -m32 -ffreestanding -fno-pie -fno-pic \
         -fno-stack-protector -O2

CXXFLAGS = $(CFLAGS) -fno-exceptions -fno-rtti \
           -fno-use-cxa-atexit -fno-threadsafe-statics

LDFLAGS = -m elf_i386 -T linker.ld -nostdlib

all: iso

build:
	mkdir -p build

build/boot.o: boot/boot.S | build
	$(AS) -m32 -c $< -o $@

build/main.o: src/main.c | build
	$(CC) $(CFLAGS) -c $< -o $@

build/kernel.o: src/kernel.cpp | build
	$(CXX) $(CXXFLAGS) -c $< -o $@

build/legacyos.bin: build/boot.o build/main.o build/kernel.o
	$(LD) $(LDFLAGS) -o $@ $^

iso: build/legacyos.bin
	mkdir -p iso/boot
	cp build/legacyos.bin iso/boot/legacyos.bin
	grub-file --is-x86-multiboot build/legacyos.bin
	grub-mkrescue -o build/LegacyOS.iso iso

clean:
	rm -rf build
	rm -f iso/boot/legacyos.bin

.PHONY: all build iso clean
