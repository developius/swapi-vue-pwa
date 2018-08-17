import { mount } from '@vue/test-utils'
import Hello from '@/components/Hello'

describe('Hello.vue', () => {
  describe('data', () => {
    it('should have initial data', () => {
      const wrapper = mount(Hello)

      expect(wrapper.vm.results).to.deep.equal([])
      expect(wrapper.vm.entities).to.deep.equal([])
      expect(wrapper.vm.selectedResult).to.equal(null)
      expect(wrapper.vm.selectedEntity).to.equal(null)
      expect(wrapper.vm.query).to.equal('')
    })
  })

  describe('methods', () => {
    it('getName should return the correct property', () => {
      const wrapper = mount(Hello)

      expect(wrapper.vm.getName({
        name: 'my name'
      })).to.equal('my name')

      expect(wrapper.vm.getName({
        name: null,
        title: 'my name'
      })).to.equal('my name')
    })

    it('capitalise should capitalise a string', () => {
      const wrapper = mount(Hello)

      expect(
        wrapper.vm.capitalise('my name')
      ).to.equal('My name')
    })

    it('clearResults should clear everything', () => {
      const wrapper = mount(Hello)

      wrapper.vm.clearResults()

      expect(wrapper.vm.selectedResult).to.equal(null)
      expect(wrapper.vm.query).to.equal(null)
      expect(wrapper.vm.results).to.deep.equal([])
    })

    it('selectResult should select the right entity', () => {
      const wrapper = mount(Hello)

      const entity = {
        name: 'thing',
        attribute: 'value',
        edited: new Date()
      }

      wrapper.vm.selectResult(entity)
      expect(wrapper.vm.selectedResult).to.deep.equal(entity)
    })

    it('extractRedableCharacteristics should return the correct attributes', () => {
      const wrapper = mount(Hello)

      const entity = {
        url: 'https://example.com',
        created: new Date(),
        edited: new Date(),
        name: 'thing',
        title: 'other thing',
        attribute: 'value',
        thing: false,
        another: 'http://example.com',
        a: ['a', 'b']
      }

      expect(
        wrapper.vm.extractRedableCharacteristics(entity)
      ).to.deep.equal([
        { name: 'Title', value: 'other thing' },
        { name: 'Attribute', value: 'value' },
        { name: 'A', value: 2 }
      ])
    })

    it('handleKeydown correctly responds to escape', () => {
      const wrapper = mount(Hello)

      const e = {
        keyCode: 27
      }

      wrapper.vm.handleKeydown(e)

      expect(wrapper.vm.selectedResult).to.equal(null)
    })

    it('search works correctly', function (done) {
      this.timeout(10000)

      const wrapper = mount(Hello, {
        data () {
          return {
            query: 'Darth Vader',
            selectedEntity: 'people'
          }
        }
      })

      wrapper.vm.search()

      setTimeout(() => {
        expect(wrapper.vm.results.results.length).to.equal(1)
        expect(wrapper.vm.results.results[0].name).to.equal('Darth Vader')

        done()
      }, 5000)
    })
  })
})
