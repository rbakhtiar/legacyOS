
#![no_std]

pub struct KernelInfo {
    pub version: u32,
    pub architecture: &'static str,
}

pub fn information() -> KernelInfo {
    KernelInfo {
        version: 1,
        architecture: "x86",
    }
}

pub fn is_supported(version: u32) -> bool {
    version == 1
}
