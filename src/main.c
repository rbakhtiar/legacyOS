extern void terminal_write(const char* text);

void legacy_c_status(void)
{
    terminal_write("C subsystem: ONLINE\n");
    terminal_write("System core: INITIALIZED\n");
}
