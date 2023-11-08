const promisifiedTimeout = () => {
  return new Promise((resolve, reject) => {
    //krijgt twee argumenten, twee functies, resolve en reject
    setTimeout(() => {
      resolve();
    }, 10000);
  });
};

promisifiedTimeout().then(() => {
  console.log("hallo na tien");
});

//zelfde maar met ook een reject

const promisifiedTimeout2 = (timeout) => {
  return new Promise((resolve, reject) => {
    //krijgt twee argumenten, twee functies, resolve en reject
    setTimeout(() => {
      if (timeout < 5000) {
        reject();
      } else {
        resolve();
      }
    }, timeout);
  });
};

promisifiedTimeout(6000)
  .then(() => {
    console.log("hallo na tien");
  })
  .error((error) => {
    console.log(error);
  });
