export default class Timer {
  /**
   * Creates an instance of Timer.
   * @param {function} callback
   * @param {number} [interval=100] Time to wait until next iteration
   * @param {boolean} [waitForCompletion=false] Wait for completion. If true, Timer will wait for both callback and interval to finish
   */
  constructor (callback, interval = 100, waitForCompletion = false) {
    if (typeof callback === 'function') {
      this.callback = callback
    } else {
      throw new Error('Provided callback is not a function')
    }

    this.interval = interval
    this.waitForCompletion = waitForCompletion
    if (waitForCompletion) {
      this.waitForCompletionLoop()
    } else {
      this.changeInterval()
    }

    this.isPause = false
    this.stopped = false
  }

  /**
   * Changes the interval
   */
  changeInterval (interval) {
    this.interval = interval
    if (!this.waitForCompletion) {
      this.stop()
      this.ticker = setInterval(() => {
        this.tick()
      }, this.interval)
    }
  }

  /**
   * Starts the timer set to wait for execution to finish
   */
  waitForCompletionLoop () {
    setTimeout(async () => {
      // Main loop
      while (!this.stopped) {
        // Wait for both execution and interval
        await Promise.all([
          this.tick(),
          new Promise((resolve) => {
            setTimeout(function () {
              resolve()
            }, this.interval)
          })
        ])
      }
    }, 0)
  }

  /**
   * Pause the timer
   */
  pause () {
    this.isPause = true
  }

  /**
   * Resume the timer
   */
  resume () {
    this.isPause = false
  }

  /**
   * Stop the timer
   */
  stop () {
    clearInterval(this.ticker)
    this.stopped = true
  }

  /**
   * Executes the callback
   */
  async tick () {
    if (!this.isPause) {
      await this.callback()
    }
  }
}
