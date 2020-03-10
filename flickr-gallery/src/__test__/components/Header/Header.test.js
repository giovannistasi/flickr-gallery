import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from '../../../store/reducers/index.js'
import Header from '../../../components/Header/Header';
import PictureGrid from '../../../containers/PictureGrid/PictureGrid'
import mocks from '../../mocks/mocks'


const mockPicture = mocks.mockPicture;
const mockPicture2 = mocks.mockPicture2

const pictures = [mockPicture, mockPicture2]
const INITIAL_STATE = { pictures: { pictureList: pictures } }

function renderWithRedux(
  ui,
  { store = createStore(reducer,
    INITIAL_STATE) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

describe('Header', () => {
  it('should filter pictures on tag select', async () => {
    // const header = renderWithRedux(
    //   <Header />

    // );

    // // const pictureGrid = renderWithRedux(
    // //   <PictureGrid picture={mockPicture} />
    // // );

    // const selectElement = await waitForElement(() => header.container.querySelector('.categories'));

    // // const previousImage = await waitForElement(() => pictureGrid.container.querySelector('.Picture__img-mask'));
    // fireEvent.change(selectElement);

    // console.log(header.store.getState());
    // expect(header.store.getState.pictures.selectedTag).toBeTruthy();


    // const followingImage = await waitForElement(() => pictureGrid.container.querySelector('.Picture__img-mask'));
    // expect(previousImage).not.toEqual(followingImage);

  })
})