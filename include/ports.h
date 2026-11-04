
#ifndef LEGACY_PORTS_H
#define LEGACY_PORTS_H

#include "types.h"

static inline u8 port_read(u16 port) {
    u8 value;
    __asm__ volatile("inb %1, %0"
                     : "=a"(value)
                     : "Nd"(port));
    return value;
}

static inline void port_write(u16 port, u8 value) {
    __asm__ volatile("outb %0, %1"
                     :
                     : "a"(value), "Nd"(port));
}

#endif
