import React from 'react';
import { render, getByRole, fireEvent, waitForElement } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from '../../store/reducers/index.js'
import PictureGrid from './PictureGrid.jsx';

const mockPicture = {
  title: 'ciao',
  id: 1,
  ownerInfo: {
    profile: {
      first_name: 'Bob',
      last_name: 'Stasi',
      id: '1234'
    }
  }
}
const mockPicture2 = {
  title: 'ciao2',
  id: 2,
  ownerInfo: {
    profile: {
      first_name: 'Bob',
      last_name: 'Stasi',
      id: '1234'
    }
  }
}

const pictures = [mockPicture, mockPicture2]
const INITIAL_STATE = { pictures: { pictureList: pictures } }
function renderWithRedux (
  ui,
  { store = createStore(reducer,
    INITIAL_STATE) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

describe("Button click", () => {
  it('loads selectedPicture on click', async () => {
    const { container } = renderWithRedux(
      <PictureGrid picture={mockPicture} />
    )
    const PictureElement = await waitForElement(() => container.querySelector('.Picture'));
    fireEvent.click(PictureElement)
    expect(container.querySelector('.SelectedPicture__outer')).toBeTruthy();
  });
});