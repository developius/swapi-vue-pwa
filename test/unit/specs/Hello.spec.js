import Vue from 'vue'
import Hello from '@/components/Hello'

describe('Hello.vue', () => {
  let Constructor, vm, inputField
  beforeEach(() => {
    Constructor = Vue.extend(Hello)
    vm = new Constructor().$mount()
    inputField = vm.$el.querySelector('input')
  })

  it('should render correct contents', () => {
    expect(vm.name).to.equal('')
    expect(vm.msg).to.equal('Your name is')
    expect(vm.message).to.equal('Your name is')
  })

  it('should render the correct content when the name is empty', done => {
    // change the value and dispatch the event
    inputField.value = ''
    inputField.dispatchEvent(new Event('input'))

    // wait for vue to propagate to computed properties (which msg is)
    vm.$nextTick(() => {
      expect(vm.msg).to.equal('Your name is')

      expect(vm.$el.querySelector('.hello h1').textContent)
        .to.equal('Your name is')

      done()
    })
  })

  it('should render the correct content when the name is set', done => {
    // change the value and dispatch the event
    inputField.value = 'Finnian Anderson'
    inputField.dispatchEvent(new Event('input'))

    // wait for vue to propagate to computed properties (which msg is)
    vm.$nextTick(() => {
      expect(vm.msg).to.equal('Your name is Finnian Anderson')

      expect(vm.$el.querySelector('.hello h1').textContent)
        .to.equal('Your name is Finnian Anderson')

      done()
    })
  })
})
