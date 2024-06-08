export const sleep = (time = 1000) => {
    // sau time 1000ms thi se goi resolve
    // (resolve,rejected) => setTimeout(resolve, time)
    return new Promise((resolve) => setTimeout(resolve, time))
}