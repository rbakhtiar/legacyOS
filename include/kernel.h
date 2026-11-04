
#ifndef LEGACY_KERNEL_H
#define LEGACY_KERNEL_H

void kernel_initialize(void);
void kernel_panic(const char* message);
void kernel_idle(void);

#endif
