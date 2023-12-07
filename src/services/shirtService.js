export const getAllShirts = () => {
    const getToken = JSON.parse(localStorage.getItem("flashes_token"));
    const token = getToken.token;
    return fetch("http://localhost:8000/shirts", {
      headers: {
        Authorization: `Token ${token}`,
        // Add other headers if needed
      },
    }).then((res) => res.json());
  };