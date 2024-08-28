import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Actions from './Redux/actions';
import * as Selectors from './Redux/selectors';

const GetWeeklyPlan = (setPageLoading) => {
  const selectSectionName = Selectors.makeGetSectionName();
  const sectionName = useSelector(selectSectionName, shallowEqual);

  useEffect(() => {
    setPageLoading(true);
    // if the meal is already planned then set the section name to 'Weekly Plan'
    const memberCode = JSON.parse(localStorage.getItem('user'))['code'];
    axiosClient
      .get(`/meal-plan?memberCode=${memberCode}`)
      .then((res) => {
        console.log('response /meal-plan : ', res.data);
        if (res?.data?.success === true && res?.data?.data.length !== 0) {
          dispatch(Actions.updateWeeklyPlan(res?.data?.data));
          dispatch(Actions.updateSectionName('Weekly Plan'));
        } else {
          console.log('1');
          // else start wiponse /meal-plan : ', res.datath the 'Get Started'
          dispatch(Actions.updateSectionName('Get Started'));
        }
      })
      .catch((err) => {
        // else start with the 'Get Started'
        dispatch(Actions.updateSectionName('Get Started'));
        console.log(err);
      })
      .finally(() => setPageLoading(false));
  }, []);

  return sectionName;
};

export default GetWeeklyPlan;
