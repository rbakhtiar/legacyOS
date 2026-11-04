typedef unsigned char uint8_t;
typedef unsigned short uint16_t;

static const int WIDTH = 80;
static const int HEIGHT = 25;

static uint16_t* const VGA =
    reinterpret_cast<uint16_t*>(0xB8000);

static int cursor = 0;

static uint8_t color = 0x0A;

extern "C" void legacy_c_status();

void terminal_clear()
{
    for (int i = 0; i < WIDTH * HEIGHT; i++)
    {
        VGA[i] = (uint16_t(color) << 8) | ' ';
    }

    cursor = 0;
}

void terminal_write(const char* text)
{
    while (*text)
    {
        if (*text == '\n')
        {
            cursor = ((cursor / WIDTH) + 1) * WIDTH;
        }
        else
        {
            VGA[cursor++] =
                (uint16_t(color) << 8) | *text;
        }

        if (cursor >= WIDTH * HEIGHT)
            cursor = 0;

        text++;
    }
}

extern "C" void kernel_main()
{
    terminal_clear();

    terminal_write("LEGACY OS\n");
    terminal_write("-------------------------------\n");
    terminal_write("RAVEN TECHNOLOGIES\n\n");

    terminal_write("Kernel: C++\n");
    terminal_write("Architecture: x86 32-bit\n");
    terminal_write("Bootloader: GRUB\n\n");

    legacy_c_status();

    terminal_write("\n\nSystem initialized.\n");
    terminal_write("Welcome to LegacyOS.\n");
}
