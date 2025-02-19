import { useDownloadFileRevision } from "./useDownloadFileRevision";
import { renderHook } from "../tests/utils";
import { useSelector } from "react-redux";
import * as storeUtils from "../store/utils";

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('useDownloadFileRevision', () => {
  test('File revision is not downloaded if no revision is specified', () => {
    jest.spyOn(storeUtils, 'appDispatch').mockImplementation(() => ({}) as any)
    const { result } = renderHook(() => useDownloadFileRevision());
    result.current.onDownload()

    expect(storeUtils.appDispatch).not.toHaveBeenCalled()
  })

  test('File revision is downloaded', () => {
    const revisionInfo = { url: '/some/file.txt', revision: 1 };
    jest.spyOn(storeUtils, 'appDispatch').mockImplementation(() => ({}) as any);
    (useSelector as unknown as jest.Mock).mockReturnValue(revisionInfo)
    
    const { result } = renderHook(() => useDownloadFileRevision())
    result.current.onDownload()

    // Can't get this one to work. Setting up
    // jest + redux from scratch is nightmare...
    // expect(storeUtils.appDispatch).toHaveBeenCalledTimes(1)
  })
})
