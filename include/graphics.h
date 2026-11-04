
#ifndef LEGACY_GRAPHICS_H
#define LEGACY_GRAPHICS_H

#include <stdint.h>

typedef struct {
    uint32_t* address;
    uint32_t width;
    uint32_t height;
    uint32_t pitch;
} LegacyFramebuffer;

void graphics_init(LegacyFramebuffer* framebuffer);
void graphics_clear(uint32_t color);
void graphics_pixel(uint32_t x, uint32_t y, uint32_t color);
void graphics_rect(
    uint32_t x,
    uint32_t y,
    uint32_t width,
    uint32_t height,
    uint32_t color
);

#endif
