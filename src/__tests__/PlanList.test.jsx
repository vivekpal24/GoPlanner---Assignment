import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PlanList from "../components/PlanList";

const mockSchedules = [
  {
    id: "plan1",
    startDate: "2025-09-27",
    totalDays: 2,
    theme: "social",
    days: [
      { dayName: "Saturday", activities: [] },
      { dayName: "Sunday", activities: [] },
    ],
  },
  {
    id: "plan2",
    startDate: "2025-10-04",
    totalDays: 2,
    theme: "lazy",
    days: [
      { dayName: "Saturday", activities: [] },
      { dayName: "Sunday", activities: [] },
    ],
  },
];

const mockWeekendThemes = {
  lazy: { name: "Lazy Weekend" },
  social: { name: "Social Weekend" },
};

describe("PlanList Component", () => {
  it("renders all saved schedules with theme names", () => {
    render(
      <PlanList
        savedSchedules={mockSchedules}
        loadSavedSchedule={vi.fn()}
        handleDeleteSchedule={vi.fn()}
        selectedPlanId={null}
        setSavedSchedules={vi.fn()}
        setHolidayDays={vi.fn()}
        setSelectedPlanId={vi.fn()}
        weekendThemesState={mockWeekendThemes}
      />
    );

    expect(
      screen.getByText(/2\s*days\s*-\s*27\/9\/2025/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Theme:\s*Social Weekend/i)).toBeInTheDocument();

    expect(
      screen.getByText(/2\s*days\s*-\s*4\/10\/2025/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Theme:\s*Lazy Weekend/i)).toBeInTheDocument();
  });

  it("calls loadSavedSchedule when plan is clicked", () => {
    const loadFn = vi.fn();
    render(
      <PlanList
        savedSchedules={mockSchedules}
        loadSavedSchedule={loadFn}
        handleDeleteSchedule={vi.fn()}
        selectedPlanId={null}
        setSavedSchedules={vi.fn()}
        setHolidayDays={vi.fn()}
        setSelectedPlanId={vi.fn()}
        weekendThemesState={mockWeekendThemes}
      />
    );

    const planDiv = screen.getByText(/2\s*days\s*-\s*27\/9\/2025/i).closest("div");
    fireEvent.click(planDiv);
    expect(loadFn).toHaveBeenCalledTimes(1);
  });
});
