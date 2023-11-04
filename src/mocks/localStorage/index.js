const mockLocalStorage = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();
  const removeItemMock = jest.fn();

  beforeEach(() => {
    // localStorage.setItem()
    Storage.prototype.setItem = setItemMock;
    // localStorage.getItem()
    Storage.prototype.getItem = getItemMock;
    // localStorage.removeItem()
    Storage.prototype.removeItem = removeItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
    removeItemMock.mockRestore();
  });

  return { setItemMock, getItemMock, removeItemMock };
};

export { mockLocalStorage };
