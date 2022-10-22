'use babel';

import Daorong01View from './daorong01-view';
import { CompositeDisposable } from 'atom';

export default {

  daorong01View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.daorong01View = new Daorong01View(state.daorong01ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.daorong01View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'daorong01:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.daorong01View.destroy();
  },

  serialize() {
    return {
      daorong01ViewState: this.daorong01View.serialize()
    };
  },

  toggle() {
    console.log('Daorong01 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
