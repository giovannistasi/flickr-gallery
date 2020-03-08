import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import reducer from '../../../store/reducers/index.js'
import PictureGrid from '../../../containers/PictureGrid/PictureGrid'
import Picture from '../../../components/Picture/Picture'
import SelectedPicture from '../../../components/SelectedPicture/SelectedPicture'

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

const handleClick = () => {
  () => { };
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

describe('Picture Grid loading', () => {

  it('should load pictures correctly', async () => {
    const { container } = renderWithRedux(
      <Picture picture={mockPicture} handleClick={handleClick} />
    );
    expect(container.querySelector('.Picture__img-mask')).toBeTruthy();
    expect(container.querySelector('.Picture__title')).toBeTruthy()
  });

  it('should load selectedPicture on click', async () => {
    const { container } = renderWithRedux(
      <PictureGrid picture={mockPicture} />
    );
    const PictureElement = await waitForElement(() => container.querySelector('.Picture'));
    fireEvent.click(PictureElement)
    expect(container.querySelector('.SelectedPicture__outer')).toBeTruthy();
  });

  it('should render selected picture correctly', () => {
    const { container } = renderWithRedux(
      <SelectedPicture selectedPicture={mockPicture} handleClick={handleClick} />
    );
    expect(container.querySelector('.SelectedPicture__outer')).toMatchSnapshot()
  });

  it('should load more pictures on scroll', () => {
    const { container } = renderWithRedux(
      <PictureGrid picture={mockPicture} />
    );
    const mockScrollFetch = jest.fn(container.listenForScrollAndFetch)
    fireEvent.scroll(container, { target: { scrollY: 1000 } });
    expect(mockScrollFetch);
  });
});
