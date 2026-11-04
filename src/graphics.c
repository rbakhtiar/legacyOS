
#include "graphics.h"

static LegacyFramebuffer* screen = 0;

void graphics_init(LegacyFramebuffer* framebuffer) {
    if (!framebuffer || !framebuffer->address)
        return;

    screen = framebuffer;
}

void graphics_pixel(uint32_t x, uint32_t y, uint32_t color) {
    if (!screen || !screen->address)
        return;

    if (x >= screen->width || y >= screen->height)
        return;

    uint32_t* pixel = (uint32_t*)(
        (uint8_t*)screen->address +
        y * screen->pitch +
        x * sizeof(uint32_t)
    );

    *pixel = color;
}

void graphics_clear(uint32_t color) {
    if (!screen)
        return;

    for (uint32_t y = 0; y < screen->height; y++) {
        for (uint32_t x = 0; x < screen->width; x++) {
            graphics_pixel(x, y, color);
        }
    }
}

void graphics_rect(
    uint32_t x,
    uint32_t y,
    uint32_t width,
    uint32_t height,
    uint32_t color
) {
    if (!screen)
        return;

    for (uint32_t row = 0; row < height; row++) {
        for (uint32_t col = 0; col < width; col++) {
            graphics_pixel(x + col, y + row, color);
        }
    }
}
