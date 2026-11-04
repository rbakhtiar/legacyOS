
#include "kernel.h"
#include "console.h"

void kernel_initialize(void) {
    console_clear();
    console_write("LEGACY OS\n");
    console_write("----------------------------\n");
    console_write("Kernel initialized.\n");
    console_write("Architecture: x86\n");
    console_write("Core: Legacy Kernel\n");
}

void kernel_panic(const char* message) {
    console_write("\nKERNEL PANIC: ");
    console_write(message);
    kernel_idle();
}

void kernel_idle(void) {
    for (;;) {
        __asm__ volatile("hlt");
    }
}
