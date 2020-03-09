import React from 'react'
import { render } from '@testing-library/react'
import Picture from '../../../components/Picture/Picture';


const handleClick = (e) => {
  console.log(e);
}

const mockPicture = {
  title: 'ciao',
  ownerInfo: {
    profile: {
      first_name: 'Bob',
      last_name: 'Stasi',
      id: '1234'
    }
  }
}

describe("Picture component", () => {
  const { container } = render(<Picture handleClick={handleClick} picture={mockPicture} />)
  it('loads Picture component', async () => {
    expect(container.firstChild.classList.contains('Picture')).toBe(true);
  });
});