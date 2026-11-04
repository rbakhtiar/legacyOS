
#include "cpu.hpp"

namespace LegacyCPU {

void halt() {
    __asm__ volatile("hlt");
}

void enable_interrupts() {
    __asm__ volatile("sti");
}

void disable_interrupts() {
    __asm__ volatile("cli");
}

}
