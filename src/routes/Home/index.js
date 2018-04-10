import HomeView from './components/HomeView'
export default () => ({
  getComponent(nextState, cb) {
    cb(null, HomeView)
  }
})
