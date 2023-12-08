const fns = {
    checkPastOrFutureDate:(dateString)=> {
        const inputDate = new Date(dateString)
        const currentDate = new Date()
        if (inputDate < currentDate) {
          return 'expired'
        } else {
          return 'future'
        }
      }
}

export default fns